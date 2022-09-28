package com.ssafy.hugging.member.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.hugging.counsel.domain.Counsel;
import com.ssafy.hugging.favorite.domain.FavoriteCounselor;
import com.ssafy.hugging.favorite.domain.FavoriteMusic;
import com.ssafy.hugging.member.dto.MemberJoinRequest;
import com.ssafy.hugging.model.Gender;
import com.ssafy.hugging.review.domain.CounselorReview;
import com.ssafy.hugging.music.domain.MusicReview;

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
public class Member implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(unique = true, nullable = false)
	private String email;
	private Integer age;
	@Column(unique = true, nullable = false)
	private String nickname;
	@Enumerated(EnumType.STRING)
	private Gender gender;
	private Integer profileImage;

	@OneToMany(mappedBy = "member")
	private List<Counsel> counselList = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	@JsonManagedReference
	private List<FavoriteCounselor> favoriteCounselorList = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	@JsonManagedReference
	private List<CounselorReview> counselorReviewList = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	@JsonManagedReference
	private List<FavoriteMusic> favoriteMusicList = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	@JsonManagedReference
	private List<MusicReview> musicReviewList = new ArrayList<>();

	public static Member from(MemberJoinRequest memberJoinRequest) {
		return Member.builder()
			.email(memberJoinRequest.getEmail())
			.age(memberJoinRequest.getAge())
			.nickname(memberJoinRequest.getNickname())
			.gender(memberJoinRequest.getGender())
			.profileImage(memberJoinRequest.getProfileImage())
			.build();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getPassword() {
		return null;
	}

	@Override
	public String getUsername() {
		return this.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
