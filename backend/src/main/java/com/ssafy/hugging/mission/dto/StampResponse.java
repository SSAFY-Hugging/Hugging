package com.ssafy.hugging.mission.dto;

import java.time.format.DateTimeFormatter;

import lombok.Getter;

@Getter
public class StampResponse {
	private final String date;
	private final Integer count;

	public StampResponse(Stamp stamp) {
		this.date = stamp.getCreateDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		this.count = stamp.getStamp();
	}
}
