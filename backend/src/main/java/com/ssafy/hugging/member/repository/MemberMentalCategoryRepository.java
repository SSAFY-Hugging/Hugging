package com.ssafy.hugging.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.hugging.member.domain.MemberMentalCategory;

public interface MemberMentalCategoryRepository extends JpaRepository<MemberMentalCategory, Integer> {
}
