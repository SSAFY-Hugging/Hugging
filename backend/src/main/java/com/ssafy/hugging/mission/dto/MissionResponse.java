package com.ssafy.hugging.mission.dto;

import com.ssafy.hugging.mission.domain.Mission;
import com.ssafy.hugging.mission.domain.MissionSubject;

import lombok.Getter;

@Getter
public class MissionResponse {
	private final Integer id;
	private final MissionSubject missionSubject;
	private final String name;
	private final String explanation;

	public MissionResponse(Mission mission) {
		id = mission.getId();
		missionSubject = mission.getMissionSubject();
		name = mission.getName();
		explanation = mission.getExplanation();
	}
}
