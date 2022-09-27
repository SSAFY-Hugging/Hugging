package com.ssafy.hugging.counselor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.hugging.counselor.domain.Counselor;

@Repository
public interface CounselorRepository extends JpaRepository<Counselor, Integer> {
	
}
