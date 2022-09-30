package com.ssafy.hugging.mission.dto;

import java.time.LocalDate;

import com.ssafy.hugging.mission.domain.ProceedingMission;

import lombok.Getter;

@Getter
public class Stamp {
	private final LocalDate createDate;
	private final Integer stamp;

	public Stamp(ProceedingMission proceedingMission) {
		createDate = proceedingMission.getCreateDate();
		stamp = 1;
	}

	public Stamp(LocalDate createDate, Long stamp) {
		this.createDate = createDate;
		this.stamp = (int)(long)stamp;
	}
}
