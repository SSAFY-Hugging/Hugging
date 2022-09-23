package com.ssafy.hugging.member.dto;

import com.ssafy.hugging.model.Gender;

import lombok.Getter;

@Getter
public class MemberJoinRequest {
	private Integer id;
	private String email;
	private String name;
	private Integer age;
	private String nickname;
	private Gender gender;
	private Integer profileImage;
}
