package com.ssafy.hugging.member.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.ssafy.hugging.counsel.domain.Counsel;
import com.ssafy.hugging.counsel.domain.CounselorReview;
import com.ssafy.hugging.counsel.domain.FavoriteCounselor;
import com.ssafy.hugging.member.dto.MemberJoinRequest;
import com.ssafy.hugging.model.Gender;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 2022-09-15
 * 멤버 테이블
 * made by 송예림
 */

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(unique = true, nullable = false)
	private String email;
	@Column(nullable = false)
	private String name;
	private Integer age;
	@Column(unique = true, nullable = false)
	private String nickname;
	@Enumerated(EnumType.STRING)
	private Gender gender;
	private Integer profileImage;

	@OneToMany(mappedBy = "member")
	private List<Counsel> counselList = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<FavoriteCounselor> favoriteCounselorList = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<CounselorReview> counselorReviewList = new ArrayList<>();
}
