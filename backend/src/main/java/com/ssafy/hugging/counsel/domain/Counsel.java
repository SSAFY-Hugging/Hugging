package com.ssafy.hugging.counsel.domain;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.hugging.counselor.domain.Counselor;
import com.ssafy.hugging.member.domain.Member;
import com.ssafy.hugging.model.BaseEntity;
import com.ssafy.hugging.model.Status;
import com.ssafy.hugging.model.Subject;

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
public class Counsel extends BaseEntity {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
	private LocalDateTime reservationDate;
	@Enumerated(EnumType.STRING)
	private Subject subject;
	@Enumerated(EnumType.STRING)
	// @Column(columnDefinition = "varchar(32) default 'INCOMPLETE")
	private Status status;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "counselorId")
	private Counselor counselor;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "memberId")
	private Member member;

	public void setCounselor(Counselor counselor) {
		this.counselor = counselor;
		counselor.getCounselList().add(this);
	}

	public void setMember(Member member) {
		this.member = member;
		counselor.getCounselList().add(this);
	}
}
