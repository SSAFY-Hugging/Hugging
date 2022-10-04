package com.ssafy.hugging.psychologicalTest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.hugging.psychologicalTest.domain.PsychologicalTestQuestion;

@Repository
public interface PsychologicalTestQuestionRepository extends JpaRepository<PsychologicalTestQuestion, Integer> {
	List<PsychologicalTestQuestion> findPsychologicalTestQuestionsByPsychologicalTestCategoryId(Integer cateIntegerId);
}
