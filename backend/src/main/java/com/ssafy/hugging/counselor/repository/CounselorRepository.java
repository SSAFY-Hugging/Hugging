package com.ssafy.hugging.counselor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.hugging.counselor.domain.Counselor;
import com.ssafy.hugging.model.Subject;

@Repository
public interface CounselorRepository extends JpaRepository<Counselor, Integer> {
	List<Counselor> findCounselorsBySubject(@Param("subject") Subject subject);

	Counselor findCounselorById(Integer id);
}
