package com.ssafy.hugging.counselor.controller;

import static com.ssafy.hugging.counselor.CounselorConstant.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hugging.counselor.dto.CounselorLoginRequest;
import com.ssafy.hugging.counselor.dto.CounselorReviewRequest;
import com.ssafy.hugging.counselor.service.CounselorService;
import com.ssafy.hugging.global.common.Response;
import com.ssafy.hugging.model.Subject;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/counselors")
public class CounselorController {
	private final CounselorService counselorService;
	private final Response response;

	@GetMapping("/{id}")
	@ApiOperation(value = "상담사 정보 조회", notes = "상담사 정보 조회")
	public ResponseEntity<?> getCounselorById(@PathVariable Integer id) {
		return response.success(counselorService.getCounselor(id), "getCounselorById success", HttpStatus.OK);
	}

	@GetMapping("")
	@ApiOperation(value = "전문분야별 상담사 조회", notes = "전문분야 별 상담사 조회")
	public ResponseEntity<?> getCounselorsBySubject(@RequestParam Subject subject) {
		return response.success(counselorService.getCounselorBySubject(subject), "getCounselorsBySubject success",
			HttpStatus.OK);
	}

	@GetMapping("/{counselorId}/reviews")
	@ApiOperation(value = "상담사 리뷰 조회", notes = "한 상담사 기준으로 유저가 제일 최근에 등록한 리뷰 조회")
	public ResponseEntity<?> getCounselorReview(@PathVariable Integer counselorId) {
		return response.success(counselorService.getCounselorReview(counselorId), "getCounselorReview success",
			HttpStatus.OK);
	}

	@PostMapping("/reviews")
	@ApiOperation(value = "상담사 리뷰 작성", notes = "상담사 리뷰 작성")
	public ResponseEntity<?> writeCounselorReview(@RequestBody CounselorReviewRequest counselorReviewRequest) {
		counselorService.insertCounselorReview(counselorReviewRequest);
		return response.success(HttpStatus.OK);
	}

	@PostMapping("/login")
	@ApiOperation(value = "상담사 로그인", notes = "상담사 이메일 비밀번호로 로그인")
	public ResponseEntity<?> writeCounselorReview(@RequestBody CounselorLoginRequest counselorLoginRequest) {
		return response.success(counselorService.login(counselorLoginRequest), COUNSELOR_LOGIN_SUCCESS_MESSAGE,
			HttpStatus.OK);
	}
}
