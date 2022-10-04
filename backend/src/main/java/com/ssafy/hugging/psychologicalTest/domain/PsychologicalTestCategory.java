package com.ssafy.hugging.psychologicalTest.domain;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.ssafy.hugging.model.BaseEntity;
import com.ssafy.hugging.model.Category;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class PsychologicalTestCategory extends BaseEntity {
	@Enumerated(EnumType.STRING)
	private Category category;
}
