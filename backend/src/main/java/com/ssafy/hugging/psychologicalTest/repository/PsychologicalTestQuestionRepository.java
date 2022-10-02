package com.ssafy.hugging.psychologicalTest.repository;

import com.ssafy.hugging.psychologicalTest.domain.PsychologicalTestQuestion;
import io.swagger.models.auth.In;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PsychologicalTestQuestionRepository extends JpaRepository<PsychologicalTestQuestion, Integer> {
    List<PsychologicalTestQuestion> findPsychologicalTestQuestionsByPsychologicalTestCategoryId(Integer cateIntegerId);
}
