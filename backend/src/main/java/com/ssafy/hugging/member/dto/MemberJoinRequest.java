package com.ssafy.hugging.member.dto;

import java.util.List;

import com.ssafy.hugging.model.Gender;

import lombok.Getter;

@Getter
public class MemberJoinRequest {
	private String email;
	private Integer age;
	private String nickname;
	private Gender gender;
	private Integer profileImage;

	private List<Boolean> emotion;
}
