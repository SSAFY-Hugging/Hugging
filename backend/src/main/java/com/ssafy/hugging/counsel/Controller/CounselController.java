package com.ssafy.hugging.counsel.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hugging.counsel.dto.CounselReserveRequest;
import com.ssafy.hugging.counsel.service.CounselService;
import com.ssafy.hugging.global.common.Response;
import com.ssafy.hugging.member.service.MemberService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/counsels")
public class CounselController {

	private final CounselService counselService;
	private final MemberService memberService;
	private final Response response;

	@GetMapping("/{memberId}")
	@ApiOperation(value = "상담 예약 내역 조회", notes = "회원 상담 예약 내역 조회")
	public ResponseEntity<?> getCounselByMember(@PathVariable Integer memberId) {
		return response.success(counselService.getCounselByEmail(memberId), "getCounsel success", HttpStatus.OK);
	}

	@GetMapping("/schedules/{counselorId}/{reservationDate}")
	@ApiOperation(value = "상담사 스케줄 조회", notes = "상담사 스케줄 조회")
	public ResponseEntity<?> getCounselByCounselor(@PathVariable Integer counselorId,
		@PathVariable String reservationDate) {
		return response.success(counselService.getCounselByCounselorId(counselorId, reservationDate));
	}

	@PostMapping("")
	@ApiOperation(value = "상담 예약", notes = "상담 예약")
	public ResponseEntity<?> reserveCounsel(@RequestBody CounselReserveRequest counselReserveRequest) {
		counselService.insertCounsel(counselReserveRequest);
		return response.success(HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	@ApiOperation(value = "상담 예약 취소", notes = "상담 예약 취소")
	public ResponseEntity<?> removeCounsel(@PathVariable Integer id) {
		counselService.deleteCounsel(id);
		return response.success(HttpStatus.OK);
	}
}
