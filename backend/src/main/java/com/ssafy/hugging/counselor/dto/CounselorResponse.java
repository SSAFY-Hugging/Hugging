package com.ssafy.hugging.counselor.dto;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.hugging.counselor.domain.Counselor;
import com.ssafy.hugging.model.Gender;
import com.ssafy.hugging.model.Subject;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CounselorResponse {
	private Integer counselorId;
	private String availableTime;
	private String career;
	private String certificate;
	private String email;
	private String explanation;
	private Gender gender;
	private String name;
	private Subject subject;
	private String profileImage;
	private Double average;

	private List<CounselorReviewResponse> counselorReviewList = new ArrayList<>();

	public static CounselorResponse of(Counselor counselor, Double average,
		List<CounselorReviewResponse> counselorReviewList) {
		return new CounselorResponseBuilder().counselorId(counselor.getId())
			.availableTime(counselor.getAvailableTime())
			.career(counselor.getCareer())
			.certificate(counselor.getCertificate())
			.email(counselor.getEmail())
			.explanation(counselor.getExplanation())
			.gender(counselor.getGender())
			.name(counselor.getName())
			.subject(counselor.getSubject())
			.profileImage(counselor.getProfileImage())
			.average(average)
			.counselorReviewList(counselorReviewList)
			.build();
	}
}
