package com.ssafy.hugging.music.dto;

import lombok.Getter;

@Getter
public class MusicReviewRequest {
	private Integer score;
	private Integer memberId;
	private Integer musicId;
}
