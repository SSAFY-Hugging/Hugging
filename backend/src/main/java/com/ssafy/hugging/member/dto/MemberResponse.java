package com.ssafy.hugging.member.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.hugging.counsel.dto.CounselReservationResponse;
import com.ssafy.hugging.counselor.dto.CounselorListResponse;
import com.ssafy.hugging.member.domain.Member;
import com.ssafy.hugging.member.domain.MemberMentalCategory;
import com.ssafy.hugging.member.domain.MentalCategory;
import com.ssafy.hugging.model.Gender;
import com.ssafy.hugging.music.dto.MusicResponse;

import lombok.Getter;

@Getter
public class MemberResponse {
	private final Integer id;
	private final String email;
	private final Integer age;
	private final String nickname;
	private final Gender gender;
	private final Integer profileImage;

	private final List<CounselReservationResponse> counselList = new ArrayList<>();
	private final List<CounselorListResponse> favoriteCounselorList = new ArrayList<>();
	// private final List<CounselorReviewResponse> counselorReviewList = new ArrayList<>();
	private final List<MusicResponse> favoriteMusicList = new ArrayList<>();
	// private final List<MusicReview> musicReviewList = new ArrayList<>();
	private final List<MentalCategory> memberMentalCategoryList = new ArrayList<>();

	public MemberResponse(Member member, List<CounselorListResponse> favoriteCounselorList) {
		id = member.getId();
		email = member.getEmail();
		age = member.getAge();
		nickname = member.getNickname();
		gender = member.getGender();
		profileImage = member.getProfileImage();

		counselList.addAll(
			member.getCounselList().stream().map(CounselReservationResponse::of).collect(Collectors.toList()));
		this.favoriteCounselorList.addAll(favoriteCounselorList);
		// counselorReviewList.addAll(
		// 	member.getCounselorReviewList()
		// 		.stream()
		// 		.map(CounselorReviewResponse::of)
		// );
		favoriteMusicList.addAll(member.getFavoriteMusicList()
			.stream()
			.map(favoriteMusic -> new MusicResponse(favoriteMusic.getMusic()))
			.collect(Collectors.toList()));
		// musicReviewList = getMusicReviewList();
		memberMentalCategoryList.addAll(member.getMemberMentalCategoryList()
			.stream()
			.map(MemberMentalCategory::getCategory)
			.collect(Collectors.toList()));
	}
}
