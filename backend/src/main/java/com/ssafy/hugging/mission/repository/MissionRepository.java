package com.ssafy.hugging.mission.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.hugging.mission.domain.Mission;

public interface MissionRepository extends JpaRepository<Mission, Integer> {
	Optional<Mission> findMissionById(Integer id);
}
