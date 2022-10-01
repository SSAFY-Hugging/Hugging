package com.ssafy.hugging.member.service;

import static com.ssafy.hugging.member.MemberConstant.*;
import static com.ssafy.hugging.music.MusicConstant.*;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.ssafy.hugging.counselor.domain.Counselor;
import com.ssafy.hugging.counselor.dto.CounselorResponse;
import com.ssafy.hugging.counselor.repository.CounselorRepository;
import com.ssafy.hugging.counselor.repository.CounselorReviewRepository;
import com.ssafy.hugging.favorite.domain.FavoriteCounselor;
import com.ssafy.hugging.favorite.domain.FavoriteMusic;
import com.ssafy.hugging.favorite.dto.FavoriteCounselorRequest;
import com.ssafy.hugging.favorite.dto.FavoriteMusicRequest;
import com.ssafy.hugging.favorite.repository.FavoriteCounselorRepository;
import com.ssafy.hugging.favorite.repository.FavoriteMusicRepository;
import com.ssafy.hugging.member.MemberConstant;
import com.ssafy.hugging.member.domain.Member;
import com.ssafy.hugging.member.dto.MemberJoinRequest;
import com.ssafy.hugging.member.dto.MemberResponse;
import com.ssafy.hugging.member.repository.MemberRepository;
import com.ssafy.hugging.music.domain.Music;
import com.ssafy.hugging.music.dto.MusicResponse;
import com.ssafy.hugging.music.repository.MusicRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {

	@Value("${oauth2.kakao.restApiKey}")
	private String kakao_restApiKey;

	@Value("${oauth2.kakao.redirectUri}")
	private String kakao_redirectUri;

	private final MemberRepository memberRepository;
	private final FavoriteMusicRepository favoriteMusicRepository;
	private final MusicRepository musicRepository;

	private final FavoriteCounselorRepository favoriteCounselorRepository;

	private final CounselorRepository counselorRepository;

	private final CounselorReviewRepository counselorReviewRepository;

	public MemberResponse getMemberById(Integer id) {
		Member member = memberRepository.findMemberById(id)
			.orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_MEMBER_ERROR_MESSAGE));
		List<CounselorResponse> counselorList = member.getFavoriteCounselorList()
			.stream()
			.map(favoriteCounselor -> CounselorResponse.of(favoriteCounselor.getCounselor(),
				counselorReviewRepository.findAvgByCounselorId(favoriteCounselor.getCounselor().getId())))
			.collect(Collectors.toList());
		return new MemberResponse(member, counselorList);
	}

	public String getKakaoAccessToken(String code) {
		String access_Token = "";
		String refresh_Token = "";
		String reqURL = "https://kauth.kakao.com/oauth/token";

		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection)url.openConnection();

			//POST 요청을 위해 기본값이 false인 setDoOutput을 true로
			conn.setRequestMethod("POST");
			conn.setDoOutput(true);

			//POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
			String sb = "grant_type=authorization_code" + "&client_id=" + kakao_restApiKey + "&redirect_uri="
				+ kakao_redirectUri // TODO 인가코드 받은 redirect_uri 입력
				+ "&code=" + code;
			bw.write(sb);
			bw.flush();

			//결과 코드가 200이라면 성공
			int responseCode = conn.getResponseCode();
			System.out.println("responseCode : " + responseCode);
			//요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line = "";
			StringBuilder result = new StringBuilder();

			while ((line = br.readLine()) != null) {
				result.append(line);
			}
			System.out.println("response body : " + result);

			//Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
			JsonElement element = JsonParser.parseString(result.toString());

			access_Token = element.getAsJsonObject().get("access_token").getAsString();
			refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

			System.out.println("access_token : " + access_Token);
			System.out.println("refresh_token : " + refresh_Token);

			br.close();
			bw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return access_Token;
	}

	public String getEmail(String token) {
		String reqURL = "https://kapi.kakao.com/v2/user/me";

		//access_token을 이용하여 사용자 정보 조회
		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection)url.openConnection();

			conn.setRequestMethod("POST");
			conn.setDoOutput(true);
			conn.setRequestProperty("Authorization", "Bearer " + token); //전송할 header 작성, access_token전송

			//결과 코드가 200이라면 성공
			int responseCode = conn.getResponseCode();
			System.out.println("responseCode : " + responseCode);

			//요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line = "";
			StringBuilder result = new StringBuilder();

			while ((line = br.readLine()) != null) {
				result.append(line);
			}
			br.close();
			System.out.println("response body : " + result);

			//Gson 라이브러리로 JSON파싱
			JsonElement element = JsonParser.parseString(result.toString());
			return element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
			// Optional<Member> member = memberRepository.findByEmail(email);
			// return member.orElseGet(() ->  {
			// 	Member newMember = new Member(email, nickname, "", "", "user", "하이");
			// 	memberRepository.save(newMember);
			// 	return newMember;
			// });
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	public boolean isExistEmail(String email) {
		return memberRepository.findByEmail(email).isPresent();
	}

	public Member login(String email) {
		return memberRepository.findByEmail(email)
			.orElseThrow(() -> new IllegalArgumentException(MemberConstant.MISMATCH_EMAIL_ERROR_MESSAGE));
	}

	public void join(MemberJoinRequest memberJoinRequest) {
		Member member = Member.from(memberJoinRequest);
		memberRepository.save(member);
	}

	@Override
	public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
		return memberRepository.findById(Integer.parseInt(id))
			.orElseThrow(() -> new UsernameNotFoundException(NOT_FOUND_MEMBER_ERROR_MESSAGE));
	}

	public List<MusicResponse> getFavoriteMusicList(Integer id) {
		Member member = memberRepository.findMemberById(id)
			.orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_MEMBER_ERROR_MESSAGE));
		return member.getFavoriteMusicList()
			.stream()
			.map(favoriteMusic -> new MusicResponse(favoriteMusic.getMusic()))
			.collect(Collectors.toList());
	}

	public void registerFavoriteMusic(FavoriteMusicRequest favoriteMusicRequest) {
		Member member = memberRepository.findMemberById(favoriteMusicRequest.getMemberId())
			.orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_MEMBER_ERROR_MESSAGE));
		Music music = musicRepository.findMusicById(favoriteMusicRequest.getMusicId())
			.orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_MUSIC_ERROR_MESSAGE));
		FavoriteMusic favoriteMusic = new FavoriteMusic(member, music);
		favoriteMusicRepository.save(favoriteMusic);
	}

	public void deleteFavoriteMusic(Integer memberId, Integer musicId) {
		favoriteMusicRepository.deleteFavoriteMusicByMemberIdAndMusicId(memberId, musicId);
	}

	public List<CounselorResponse> getFavoriteCounselorList(Integer id) {
		Member member = memberRepository.findMemberById(id)
			.orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_MEMBER_ERROR_MESSAGE));
		return member.getFavoriteCounselorList()
			.stream()
			.map(favoriteCounselor -> CounselorResponse.of(favoriteCounselor.getCounselor(),
				counselorReviewRepository.findAvgByCounselorId(favoriteCounselor.getCounselor().getId())))
			.collect(Collectors.toList());
	}

	public void registerFavoriteCounselor(FavoriteCounselorRequest favoriteCounselorRequest) {
		Member member = memberRepository.findMemberById(favoriteCounselorRequest.getMemberId())
			.orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_MEMBER_ERROR_MESSAGE));
		Counselor counselor = counselorRepository.findById(favoriteCounselorRequest.getCounselorId())
			.orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_COUNSELOR_ERROR_MESSAGE));
		FavoriteCounselor favoriteCounselor = new FavoriteCounselor(member, counselor);
		favoriteCounselorRepository.save(favoriteCounselor);
	}

	public void deleteFavoriteCounselor(Integer memberId, Integer counselorId) {
		favoriteCounselorRepository.deleteFavoriteCounselorByMemberIdAndCounselorId(memberId, counselorId);
	}
}
