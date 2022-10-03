package com.ssafy.hugging.mission.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.hugging.mission.domain.ProceedingMission;
import com.ssafy.hugging.mission.dto.Stamp;

public interface ProceedingMissionRepository extends JpaRepository<ProceedingMission, Integer> {
	Optional<ProceedingMission> findProceedingMissionByMissionIdAndMemberIdAndCreateDate(Integer missionId,
		Integer memberId, LocalDate createDate);

	@Query(value = "SELECT " + "new com.ssafy.hugging.mission.dto.Stamp(pm.createDate, COUNT(pm.createDate)) "
		+ "FROM ProceedingMission pm " + "WHERE pm.member.id = :memberId " + "GROUP BY pm.createDate")
	List<Stamp> findGroupByCreateDateWithJPQL(@Param("memberId") Integer id);

}
