package com.ssafy.hugging.psychologicalTest.dto;

import lombok.Getter;

@Getter
public class PsychologicalTestResultRequest {
	private Integer memberId;
	private Integer categoryId;
	private Integer score;
}
