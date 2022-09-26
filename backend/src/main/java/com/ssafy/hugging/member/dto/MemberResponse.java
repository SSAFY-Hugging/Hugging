package com.ssafy.hugging.member.dto;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.hugging.counsel.domain.Counsel;
import com.ssafy.hugging.review.domain.CounselorReview;
import com.ssafy.hugging.favorite.domain.FavoriteCounselor;
import com.ssafy.hugging.member.domain.Member;
import com.ssafy.hugging.model.Gender;

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

	public MemberResponse(Member member) {
		id = member.getId();
		email = member.getEmail();
		age = member.getAge();
		nickname = member.getNickname();
		gender = member.getGender();
		profileImage = member.getProfileImage();
	}
}
