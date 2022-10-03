package com.ssafy.hugging.mission.service;

import static com.ssafy.hugging.member.MemberConstant.*;
import static com.ssafy.hugging.mission.MissionConstant.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.hugging.member.domain.Member;
import com.ssafy.hugging.member.repository.MemberRepository;
import com.ssafy.hugging.mission.domain.Mission;
import com.ssafy.hugging.mission.domain.ProceedingMission;
import com.ssafy.hugging.mission.dto.MissionResponse;
import com.ssafy.hugging.mission.dto.ProceedingMissionRequest;
import com.ssafy.hugging.mission.dto.StampResponse;
import com.ssafy.hugging.mission.repository.MissionRepository;
import com.ssafy.hugging.mission.repository.ProceedingMissionRepository;
import com.ssafy.hugging.model.Status;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MissionService {
	private final MemberRepository memberRepository;
	private final MissionRepository missionRepository;
	private final ProceedingMissionRepository proceedingMissionRepository;

	@Transactional(readOnly = true)
	public List<MissionResponse> getAllMissions() {
		return missionRepository.findAll().stream().map(MissionResponse::new).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public List<MissionResponse> getProceedingMissions(Integer id) {
		Member member = memberRepository.findMemberById(id)
			.orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_MEMBER_ERROR_MESSAGE));
		return member.getProceedingMissionList()
			.stream()
			.filter(proceedingMission -> proceedingMission.getCreateDate()
				.isEqual(LocalDate.from(ZonedDateTime.now(ZoneId.of("Asia/Seoul")))))
			.filter(proceedingMission -> proceedingMission.getStatus() == Status.INCOMPLETE)
			.map(proceedingMission -> new MissionResponse(proceedingMission.getMission()))
			.collect(Collectors.toList());
	}

	public void addProceedingMission(ProceedingMissionRequest proceedingMissionRequest) {
		if (proceedingMissionRepository.findProceedingMissionByMissionIdAndMemberIdAndCreateDate(
			proceedingMissionRequest.getMissionId(), proceedingMissionRequest.getMemberId(),
			LocalDate.from(ZonedDateTime.now(ZoneId.of("Asia/Seoul")))).isPresent()) {
			throw new IllegalArgumentException(SAME_MISSION_ALREADY_EXIST_ERROR_MESSAGE);
		}

		Member member = memberRepository.findMemberById(proceedingMissionRequest.getMemberId())
			.orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_MEMBER_ERROR_MESSAGE));
		Mission mission = missionRepository.findMissionById(proceedingMissionRequest.getMissionId())
			.orElseThrow(() -> new IllegalArgumentException((NOT_FOUND_MISSION_ID_ERROR_MESSAGE)));
		ProceedingMission proceedingMission = new ProceedingMission(member, mission);
		proceedingMissionRepository.save(proceedingMission);
	}

	public void deleteProceedingMission(Integer memberId, Integer missionId) {
		ProceedingMission proceedingMission = proceedingMissionRepository.findProceedingMissionByMissionIdAndMemberIdAndCreateDate(
				missionId, memberId, LocalDate.from(ZonedDateTime.now(ZoneId.of("Asia/Seoul"))))
			.orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_PROCEEDING_MISSION_ERROR_MESSAGE));
		if (proceedingMission.getStatus() == Status.COMPLETE)
			throw new IllegalArgumentException(DELETE_COMPLETE_MISSION_ERROR_MESSAGE);
		proceedingMissionRepository.delete(proceedingMission);
	}

	public void completeProceedingMission(ProceedingMissionRequest proceedingMissionRequest) {
		ProceedingMission proceedingMission = proceedingMissionRepository.findProceedingMissionByMissionIdAndMemberIdAndCreateDate(
				proceedingMissionRequest.getMissionId(), proceedingMissionRequest.getMemberId(),
				LocalDate.from(ZonedDateTime.now(ZoneId.of("Asia/Seoul"))))
			.orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_PROCEEDING_MISSION_ERROR_MESSAGE));
		proceedingMission.setComplete();
	}

	public List<StampResponse> getMemberStamp(Integer memberId) {
		return proceedingMissionRepository.findGroupByCreateDateWithJPQL(memberId)
			.stream()
			.map(StampResponse::new)
			.collect(Collectors.toList());
	}
}
