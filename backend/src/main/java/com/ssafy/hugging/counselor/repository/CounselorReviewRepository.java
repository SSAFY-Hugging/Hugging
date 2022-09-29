package com.ssafy.hugging.counselor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.hugging.counselor.domain.CounselorReview;

@Repository
public interface CounselorReviewRepository extends JpaRepository<CounselorReview, Integer> {
	@Query("select cr from CounselorReview cr where cr.counselor.id = :counselorId and cr.reg_date = (select max(cr2.reg_date) from CounselorReview cr2 where cr.member.id = cr2.member.id and cr.counselor.id = cr2.counselor.id group by cr.member.id)")
	List<CounselorReview> findCounselorReviewsByCounselorId(@Param("counselorId") Integer counselorId);

	@Query("select avg(cr.score) from CounselorReview  cr where cr.counselor.id = :counselorId and cr.reg_date = (select max(cr2.reg_date) from CounselorReview cr2 where cr.member.id = cr2.member.id  and cr.counselor.id = cr2.counselor.id group by cr.member.id) group by cr.counselor.id")
	Double findAvgByCounselorId(@Param("counselorId") Integer counselorId);
}
