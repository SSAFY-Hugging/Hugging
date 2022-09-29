package com.ssafy.hugging.counselor.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;

import com.ssafy.hugging.counsel.domain.Counsel;
import com.ssafy.hugging.favorite.domain.FavoriteCounselor;
import com.ssafy.hugging.model.BaseEntity;
import com.ssafy.hugging.model.Gender;
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
public class Counselor extends BaseEntity {
	@Column(unique = true, nullable = false)
	private String email;
	@Column(nullable = false)
	private String password;
	@Column(nullable = false)
	private String name;
	private String available_time;
	private String certificate;
	@Enumerated(EnumType.STRING)
	private Subject subject;
	private String career;
	private String explanation;
	@Enumerated(EnumType.STRING)
	private Gender gender;

	@OneToMany(mappedBy = "counselor")
	private List<Counsel> counselList = new ArrayList<>();

	@OneToMany(mappedBy = "counselor")
	private List<CounselorReview> counselorReviewList = new ArrayList<>();

	@OneToMany(mappedBy = "counselor")
	private List<FavoriteCounselor> favoriteCounselorList = new ArrayList<>();

	public boolean confirmPassword(String password) {
		return password == null || this.password.equals(password);
	}
}
