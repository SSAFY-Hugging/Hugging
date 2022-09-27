package com.ssafy.hugging.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.ssafy.hugging.member.JwtTokenProvider;
import com.ssafy.hugging.member.domain.Member;
import com.ssafy.hugging.member.dto.MemberJoinRequest;
import com.ssafy.hugging.member.dto.MemberLoginResponse;
import com.ssafy.hugging.member.dto.MemberResponse;
import com.ssafy.hugging.member.service.MemberService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;
	private final JwtTokenProvider jwtTokenProvider;

	@GetMapping("/{id}")
	@ApiOperation(value = "Id로 회원정보 조회", notes = "회원 ID 값으로 회원 상세 정보 모두 조회")
	public ResponseEntity<MemberResponse> getMemberInfo(@PathVariable Integer id) {

		return new ResponseEntity<>(new MemberResponse(memberService.getMemberById(id)), HttpStatus.OK);
	}

	@PostMapping("/")
	@ApiOperation(value = "카카오 로그인", notes = "카카오로 처음 가입한 사용지인지 구분하여 동작")
	public ResponseEntity<MemberLoginResponse> kakaoCallBack(@RequestBody String code) {

		JsonElement element = JsonParser.parseString(code);
		code = element.getAsJsonObject().get("code").getAsString();

		String access_token = memberService.getKakaoAccessToken(code);
		String email = memberService.getEmail(access_token);
		boolean exist = memberService.isExistEmail(email);

		if (exist) {  //바로 로그인
			Member member = memberService.login(email);
			return new ResponseEntity<>(
				new MemberLoginResponse(false, jwtTokenProvider.createToken(String.valueOf(member.getId())), email),
				HttpStatus.OK);
		} else {  //회원가입 페이지로 이동
			return new ResponseEntity<>(new MemberLoginResponse(true, null, email), HttpStatus.OK);
		}
	}

	@PostMapping("/join")
	@ApiOperation(value = "카카오 회원가입 및 로그인", notes = "카카오 새로운 유저 회원가입/로그인")
	public ResponseEntity<String> kakaoJoinAndLogin(@RequestBody MemberJoinRequest memberJoinRequest) {
		memberService.join(memberJoinRequest);
		Integer memberId = memberService.login(memberJoinRequest.getEmail()).getId();    //PK 반환
		return new ResponseEntity<>(jwtTokenProvider.createToken(String.valueOf(memberId)), HttpStatus.OK);
	}

}
