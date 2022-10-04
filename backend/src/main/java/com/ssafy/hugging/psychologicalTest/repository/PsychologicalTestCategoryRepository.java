package com.ssafy.hugging.psychologicalTest.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.hugging.psychologicalTest.domain.PsychologicalTestCategory;

@Repository
public interface PsychologicalTestCategoryRepository extends JpaRepository<PsychologicalTestCategory, Integer> {
	Optional<PsychologicalTestCategory> findPsychologicalTestCategoryById(Integer id);
}
