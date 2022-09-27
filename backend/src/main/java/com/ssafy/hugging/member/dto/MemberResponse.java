package com.ssafy.hugging.member.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.hugging.counsel.domain.Counsel;
import com.ssafy.hugging.favorite.domain.FavoriteCounselor;
import com.ssafy.hugging.favorite.domain.FavoriteMusic;
import com.ssafy.hugging.member.domain.Member;
import com.ssafy.hugging.model.Gender;
import com.ssafy.hugging.review.domain.CounselorReview;
import com.ssafy.hugging.review.domain.MusicReview;

import lombok.Getter;

@Getter
public class MemberResponse {
	private final Integer id;
	private final String email;
	private final Integer age;
	private final String nickname;
	private final Gender gender;
	private final Integer profileImage;

	private final List<Counsel> counselList = new ArrayList<>();
	private final List<FavoriteCounselor> favoriteCounselorList = new ArrayList<>();
	private final List<CounselorReview> counselorReviewList = new ArrayList<>();
	private final List<FavoriteMusic> favoriteMusicList = new ArrayList<>();
	private final List<MusicReview> musicReviewList = new ArrayList<>();

	public MemberResponse(Member member) {
		id = member.getId();
		email = member.getEmail();
		age = member.getAge();
		nickname = member.getNickname();
		gender = member.getGender();
		profileImage = member.getProfileImage();

		//TODO : RESPONSE DTO 추가 후 리스트 반환

		// counselList.addAll(
		// 	member.getCounselList()
		// 		.stream()
		// 		.map(counsel -> new counselResponse(counsel))
		// 		.collect(Collectors.toList())
		// );
		// favoriteCounselorList = getFavoriteCounselorList();
		// counselorReviewList = getCounselorReviewList();
		// favoriteMusicList = getFavoriteMusicList();
		// musicReviewList = getMusicReviewList();
	}
}
