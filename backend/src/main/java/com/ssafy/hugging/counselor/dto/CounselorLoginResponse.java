package com.ssafy.hugging.counselor.dto;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.hugging.counsel.domain.Counsel;
import com.ssafy.hugging.counsel.dto.CounselReservationResponse;
import com.ssafy.hugging.counselor.domain.Counselor;
import com.ssafy.hugging.model.Gender;
import com.ssafy.hugging.model.Subject;

import lombok.Getter;

@Getter
public class CounselorLoginResponse {
	private final Integer id;
	private final String email;
	private final String name;
	private final String availableTime;
	private final String certificate;
	private final Subject subject;
	private final String career;
	private final String explanation;
	private final String profileImage;
	private final Gender gender;
	private final Double average;

	private final List<CounselReservationResponse> counselList = new ArrayList<>();

	public CounselorLoginResponse(Counselor counselor, double average) {
		id = counselor.getId();
		email = counselor.getEmail();
		name = counselor.getName();
		availableTime = counselor.getAvailableTime();
		certificate = counselor.getCertificate();
		subject = counselor.getSubject();
		career = counselor.getCareer();
		explanation = counselor.getExplanation();
		profileImage = counselor.getProfileImage();
		gender = counselor.getGender();
		this.average = average;

		counselList.addAll(counselor.getCounselList()
			.stream()
			.sorted(Comparator.comparing(Counsel::getReservationDate))
			.map(CounselReservationResponse::of)
			.collect(Collectors.toList()));
	}
}
