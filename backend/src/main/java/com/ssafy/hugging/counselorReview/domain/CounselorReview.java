package com.ssafy.hugging.counselorReview.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ssafy.hugging.counselor.domain.Counselor;
import com.ssafy.hugging.member.domain.Member;
import com.ssafy.hugging.model.BaseEntity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class CounselorReview extends BaseEntity {
	@Column(nullable = false)
	private Integer score;
	@Column(nullable = false)
	private String content;
	@Column(nullable = false)
	private LocalDateTime reg_date;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "counselorId")
	private Counselor counselor;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "memberId")
	private Member member;
}
