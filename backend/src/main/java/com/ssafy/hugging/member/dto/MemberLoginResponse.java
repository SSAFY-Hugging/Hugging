package com.ssafy.hugging.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MemberLoginResponse {
	private boolean isNewMember;
	private String token;
	private String email;
}
