package com.ssafy.hugging.counselor.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.CreatedDate;

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
	private String content;
	@CreatedDate
	@Column(updatable = false)
	private LocalDateTime regDate;
	@Column(nullable = false)
	private Integer score;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "counselorId")
	private Counselor counselor;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "memberId")
	private Member member;

	public void setMember(Member member) {
		this.member = member;
		member.getCounselorReviewList().add(this);
	}

	public void setCounselor(Counselor counselor) {
		this.counselor = counselor;
		counselor.getCounselorReviewList().add(this);
	}
}
