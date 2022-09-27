package com.ssafy.hugging.counsel.dto;

import java.time.LocalDateTime;

import com.ssafy.hugging.model.Subject;

import lombok.Getter;

@Getter
public class CounselReserveRequest {
	private Integer counselorId;
	private Integer memberId;
	private LocalDateTime reservationDate;
	private Subject subject;
	// private Status status;
}
