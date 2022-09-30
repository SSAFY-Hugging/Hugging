package com.ssafy.hugging.mission.controller;

import static com.ssafy.hugging.mission.MissionConstant.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hugging.global.common.Response;
import com.ssafy.hugging.mission.dto.ProceedingMissionRequest;
import com.ssafy.hugging.mission.service.MissionService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/missions")
public class MissionController {

	private final MissionService missionService;
	private final Response response;

	@GetMapping("/")
	@ApiOperation(value = "전체 미션 목록", notes = "모든 미션 목록 조회")
	public ResponseEntity<?> getAllMissions() {
		return response.success(missionService.getAllMissions(), GET_ALL_MISSIONS_SUCCESS_MESSAGE, HttpStatus.OK);
	}

	@GetMapping("/{memberId}")
	@ApiOperation(value = "회원이 진행중인 미션", notes = "특정 회원이 진행중인 미션 반환")
	public ResponseEntity<?> getProceedingMissions(@PathVariable Integer memberId) {
		return response.success(missionService.getProceedingMissions(memberId), GET_PROCEEDING_MISSIONS_SUCCESS_MESSAGE,
			HttpStatus.OK);
	}

	@PutMapping("/")
	@ApiOperation(value = "미션 완료 등록", notes = "특정 회원의 미션 완료 처리")
	public ResponseEntity<?> completeProceedingMission(@RequestBody ProceedingMissionRequest proceedingMissionRequest) {
		missionService.completeProceedingMission(proceedingMissionRequest);
		return response.success(COMPLETE_PROCEEDING_MISSION_SUCCESS_MESSAGE);
	}

	@DeleteMapping("/{memberId}")
	@ApiOperation(value = "진행중인 미션 삭제", notes = "진행중인 미션 삭제")
	public ResponseEntity<?> deleteProceedingMission(@PathVariable Integer memberId, @RequestParam Integer missionId) {
		missionService.deleteProceedingMission(memberId, missionId);
		return response.success(DELETE_PROCEEDING_MISSION_SUCCESS_MESSAGE);
	}

	@PostMapping("/")
	@ApiOperation(value = "진행중인 미션 등록", notes = "회원에게 미션 등록")
	public ResponseEntity<?> addProceedingMission(@RequestBody ProceedingMissionRequest proceedingMissionRequest) {
		missionService.addProceedingMission(proceedingMissionRequest);
		return response.success(ADD_PROCEEDING_MISSION_SUCCESS_MESSAGE);
	}

	@GetMapping("/stamp/{memberId}")
	@ApiOperation(value = "회원 스탬프 조회", notes = "특정 회원 스탬프 갯수 조회")
	public ResponseEntity<?> getMemberStampList(@PathVariable Integer memberId) {
		return response.success(
			missionService.getMemberStamp(memberId), GET_MEMBER_STAMP_LIST_SUCCESS_MESSAGE, HttpStatus.OK);
	}
}
