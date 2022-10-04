package com.ssafy.hugging.counselor.dto;

import java.time.format.DateTimeFormatter;

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
	private String regDate;
	private Integer score;
	private Double average;
	private String nickname;

	public static CounselorReviewResponse of(CounselorReview counselorReview, Double average) {
		return new CounselorReviewResponseBuilder().content(counselorReview.getContent())
			.regDate(counselorReview.getRegDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
			.score(counselorReview.getScore())
			.average(average)
			.nickname(counselorReview.getMember().getNickname())
			.build();
	}
}
