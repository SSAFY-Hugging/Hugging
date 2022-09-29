package com.ssafy.hugging.counselor.dto;

import java.time.LocalDateTime;

import com.ssafy.hugging.counselor.domain.CounselorReview;

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
public class CounselorReviewResponse {
	private String content;
	private LocalDateTime regDate;
	private Integer score;
	private Double average;

	public static CounselorReviewResponse of(CounselorReview counselorReview, Double average) {
		return new CounselorReviewResponseBuilder().content(counselorReview.getContent())
			.regDate(counselorReview.getRegDate())
			.score(counselorReview.getScore())
			.average(average)
			.build();
	}
}
