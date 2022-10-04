package com.ssafy.hugging.mission.domain;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ssafy.hugging.member.domain.Member;
import com.ssafy.hugging.model.Status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProceedingMission {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Enumerated(EnumType.STRING)
	private Status status;
	private LocalDate createDate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "memberId")
	Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "missonId")
	Mission mission;

	public void setCreateDate() {
		this.createDate = LocalDate.from(ZonedDateTime.now(ZoneId.of("Asia/Seoul")));
	}

	public ProceedingMission(Member member, Mission mission) {
		setCreateDate();
		this.member = member;
		this.mission = mission;
		setInComplete();
	}

	public void setComplete() {
		this.status = Status.COMPLETE;

	}

	public void setInComplete() {
		this.status = Status.INCOMPLETE;
	}
}
