package com.ssafy.hugging.counselor.dto;

import lombok.Getter;

@Getter
public class CounselorReviewRequest {
	private String content;
	// private LocalDateTime regDate;
	private Integer score;
	private Integer counselorId;
	private Integer memberId;
}
