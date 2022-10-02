package com.ssafy.hugging.psychologicalTest.repository;

import com.ssafy.hugging.psychologicalTest.domain.PsychologicalTestCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PsychologicalTestCategoryRepository extends JpaRepository<PsychologicalTestCategory, Integer> {
    Optional<PsychologicalTestCategory> findPsychologicalTestCategoryById(Integer id);
}
