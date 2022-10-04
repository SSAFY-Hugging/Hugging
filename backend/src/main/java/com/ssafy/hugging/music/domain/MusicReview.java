package com.ssafy.hugging.music.domain;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ssafy.hugging.member.domain.Member;
import com.ssafy.hugging.music.dto.MusicReviewRequest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MusicReview {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private Integer score;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "memberId")
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "musicId")
	private Music music;

	public static MusicReview from(MusicReviewRequest musicReviewRequest, Music music, Member member) {
		return MusicReview.builder().score(musicReviewRequest.getScore()).music(music).member(member).build();
	}

	public void setScore(Integer score) {
		this.score = score;
	}
}
