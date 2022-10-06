package com.ssafy.hugging.member.controller;

import static com.ssafy.hugging.member.MemberConstant.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.ssafy.hugging.favorite.dto.FavoriteCounselorRequest;
import com.ssafy.hugging.favorite.dto.FavoriteMusicRequest;
import com.ssafy.hugging.global.common.Response;
import com.ssafy.hugging.member.JwtTokenProvider;
import com.ssafy.hugging.member.domain.Member;
import com.ssafy.hugging.member.dto.MemberJoinRequest;
import com.ssafy.hugging.member.dto.MemberLoginResponse;
import com.ssafy.hugging.member.dto.MemberModifyRequest;
import com.ssafy.hugging.member.dto.MemberResponse;
import com.ssafy.hugging.member.service.MemberService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;
	private final JwtTokenProvider jwtTokenProvider;
	private final Response response;

	@GetMapping("/{id}")
	@ApiOperation(value = "Id로 회원정보 조회", notes = "회원 ID 값으로 회원 상세 정보 모두 조회")
	public ResponseEntity<MemberResponse> getMemberInfo(@PathVariable Integer id) {
		return new ResponseEntity<>(memberService.getMemberById(id), HttpStatus.OK);
	}

	@PostMapping("/")
	@ApiOperation(value = "카카오 로그인", notes = "카카오로 처음 가입한 사용지인지 구분하여 동작")
	public ResponseEntity<MemberLoginResponse> kakaoCallBack(@RequestBody String code) {

		JsonElement element = JsonParser.parseString(code);
		code = element.getAsJsonObject().get("code").getAsString();

		String access_token = memberService.getKakaoAccessToken(code);
		String email = memberService.getEmail(access_token);
		boolean exist = memberService.isExistEmail(email);

		if (exist) {  //바로 로그인
			Member member = memberService.login(email);
			return new ResponseEntity<>(
				new MemberLoginResponse(false, jwtTokenProvider.createToken(String.valueOf(member.getId())), email),
				HttpStatus.OK);
		} else {  //회원가입 페이지로 이동
			return new ResponseEntity<>(new MemberLoginResponse(true, null, email), HttpStatus.OK);
		}
	}

	@PostMapping("/join")
	@ApiOperation(value = "카카오 회원가입 및 로그인", notes = "카카오 새로운 유저 회원가입/로그인")
	public ResponseEntity<String> kakaoJoinAndLogin(@RequestBody MemberJoinRequest memberJoinRequest) {
		memberService.join(memberJoinRequest);
		Integer memberId = memberService.login(memberJoinRequest.getEmail()).getId();    //PK 반환
		return new ResponseEntity<>(jwtTokenProvider.createToken(String.valueOf(memberId)), HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	@ApiOperation(value = "회원 탈퇴", notes = "회원 탈퇴 진행")
	public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
		memberService.deleteUser(id);
		return response.success(DELETE_MEMBER_REQUEST_SUCCESS);
	}

	@PutMapping("/modify")
	@ApiOperation(value = "회원 이미지 변경", notes = "회원 프로필 이미지 변경")
	public ResponseEntity<?> modifyUser(@RequestBody MemberModifyRequest memberModifyRequest) {
		memberService.modifyUser(memberModifyRequest);
		return response.success(MODIFY_MEMBER_PROFILE_SUCCESS);
	}

	@GetMapping("/music/{id}")
	@ApiOperation(value = "츨겨찾기 음악 리스트 검색", notes = "회원 아이디로 즐겨찾기 한 음악 리스트 검색")
	public ResponseEntity<?> getFavoriteMusicList(@PathVariable Integer id) {
		return response.success(memberService.getFavoriteMusicList(id), GET_FAVORITE_MUSIC_LIST_SUCCESS, HttpStatus.OK);
	}

	@PostMapping("/music")
	@ApiOperation(value = "즐겨찾기 음악 등록", notes = "즐겨찾기 음악 등록")
	public ResponseEntity<?> registerFavoriteMusic(@RequestBody FavoriteMusicRequest favoriteMusicRequest) {
		memberService.registerFavoriteMusic(favoriteMusicRequest);
		return response.success(REGISTER_FAVORITE_MUSIC_LIST_SUCCESS);
	}

	@DeleteMapping("/music")
	@ApiOperation(value = "즐겨찾기 음악 삭제", notes = "음악 아이디로 즐겨 찾기 한 음악 리스트 모두 삭제")
	public ResponseEntity<?> deleteFavoriteMusic(@RequestParam Integer memberId, @RequestParam Integer musicId) {
		memberService.deleteFavoriteMusic(memberId, musicId);
		return response.success(DELETE_FAVORITE_MUSIC_LIST_SUCCESS);
	}

	@GetMapping("/counselor/{id}")
	@ApiOperation(value = "즐겨찾기 상담사 리스트 검색", notes = "회원 아이디로 즐겨찾기 한 상담사 리스트 검색")
	public ResponseEntity<?> getFavoriteCounselorList(@PathVariable Integer id) {
		return response.success(memberService.getFavoriteCounselorList(id), GET_FAVORITE_COUNSELOR_LIST_SUCCESS,
			HttpStatus.OK);
	}

	@PostMapping("/counselor")
	@ApiOperation(value = "즐겨찾기 상담사 등록", notes = "즐겨찾기 상담사 등록")
	public ResponseEntity<?> registerFavoriteCounselor(@RequestBody FavoriteCounselorRequest favoriteCounselorRequest) {
		memberService.registerFavoriteCounselor(favoriteCounselorRequest);
		return response.success(REGISTER_FAVORITE_COUNSELOR_LIST_SUCCESS);
	}

	@DeleteMapping("/cousnelor")
	@ApiOperation(value = "즐겨찾기 상담사 삭제", notes = "상담사 아이디로 즐겨찾기한 상담사 리스트 모두 삭제")
	public ResponseEntity<?> deleteFavoriteCounselor(@RequestParam Integer memberId,
		@RequestParam Integer counselorId) {
		memberService.deleteFavoriteCounselor(memberId, counselorId);
		return response.success(DELETE_FAVORITE_COUNSELOR_LIST_SUCCESS);
	}
}
