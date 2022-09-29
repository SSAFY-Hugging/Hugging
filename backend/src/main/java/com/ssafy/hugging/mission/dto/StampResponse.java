package com.ssafy.hugging.mission.dto;

import java.time.format.DateTimeFormatter;

import lombok.Getter;

@Getter
public class StampResponse {
	private final String crateDate;
	private final Integer stamp;

	public StampResponse(Stamp stamp) {
		this.crateDate = stamp.getCreateDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		this.stamp = stamp.getStamp();
	}
}
