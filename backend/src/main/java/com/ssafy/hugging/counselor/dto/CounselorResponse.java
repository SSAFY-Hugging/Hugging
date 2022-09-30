package com.ssafy.hugging.counselor.dto;

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
	private String availableTime;
	private String career;
	private String certificate;
	private String email;
	private String explanation;
	private Gender gender;
	private String name;
	private Subject subject;
	private Double average;

	// public CounselorResponse(Counselor counselor, Double average) {
	// }

	public static CounselorResponse of(Counselor counselor, Double average) {
		return new CounselorResponseBuilder().availableTime(counselor.getAvailableTime())
			.career(counselor.getCareer())
			.certificate(counselor.getCertificate())
			.email(counselor.getEmail())
			.explanation(counselor.getExplanation())
			.gender(counselor.getGender())
			.name(counselor.getName())
			.subject(counselor.getSubject())
			.average(average)
			.build();
	}
}
