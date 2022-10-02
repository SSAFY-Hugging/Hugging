package com.ssafy.hugging.psychologicalTest.dto;

import com.ssafy.hugging.psychologicalTest.domain.PsychologicalTestQuestion;
import lombok.Getter;

@Getter
public class PsychologicalTestQuestionResponse {
    private final String question;

    public PsychologicalTestQuestionResponse(PsychologicalTestQuestion psychologicalTestQuestion) {
        this.question = psychologicalTestQuestion.getQuestion();
    }
}
