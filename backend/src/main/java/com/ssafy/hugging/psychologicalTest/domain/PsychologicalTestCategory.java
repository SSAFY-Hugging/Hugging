package com.ssafy.hugging.psychologicalTest.domain;

import com.ssafy.hugging.model.BaseEntity;
import com.ssafy.hugging.model.Category;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class PsychologicalTestCategory extends BaseEntity {
    @Enumerated(EnumType.STRING)
    private Category category;
}
