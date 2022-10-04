package com.ssafy.hugging.psychologicalTest.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ssafy.hugging.member.domain.Member;
import com.ssafy.hugging.model.BaseEntity;
import com.ssafy.hugging.psychologicalTest.dto.PsychologicalTestResultRequest;

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
public class PsychologicalTestResult extends BaseEntity {
	@Column(nullable = false)
	private Integer score;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "memberId")
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "psychologicalTestCategoryId")
	private PsychologicalTestCategory psychologicalTestCategory;

	public static PsychologicalTestResult from(PsychologicalTestResultRequest psychologicalTestResultRequest,
		Member member, PsychologicalTestCategory psychologicalTestCategory) {
		return PsychologicalTestResult.builder()
			.score(psychologicalTestResultRequest.getScore())
			.member(member)
			.psychologicalTestCategory(psychologicalTestCategory)
			.build();
	}
}
