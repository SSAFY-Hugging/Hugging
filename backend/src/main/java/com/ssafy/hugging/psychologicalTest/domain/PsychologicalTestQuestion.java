package com.ssafy.hugging.psychologicalTest.domain;

import com.ssafy.hugging.model.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class PsychologicalTestQuestion extends BaseEntity {
    @Column(nullable = false)
    private String question;
    @Column(nullable = false)
    private Integer score;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "psychologicalTestCategoryId")
    private PsychologicalTestCategory psychologicalTestCategory;
}
