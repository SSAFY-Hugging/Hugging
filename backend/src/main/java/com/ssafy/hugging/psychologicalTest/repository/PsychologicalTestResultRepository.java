package com.ssafy.hugging.psychologicalTest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.hugging.psychologicalTest.domain.PsychologicalTestResult;

@Repository
public interface PsychologicalTestResultRepository extends JpaRepository<PsychologicalTestResult, Integer> {
	@Query("select ptr from PsychologicalTestResult ptr where ptr.member.id = :memberId")
	List<PsychologicalTestResult> getPsychologicalTestResultByMemberId(@Param("memberId") Integer memberId);
}
