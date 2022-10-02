package com.ssafy.hugging.counsel.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.hugging.counsel.domain.Counsel;

@Repository
public interface CounselRepository extends JpaRepository<Counsel, Integer> {
	@Query("select c from Counsel c where c.member.id = :memberId and c.status = 'INCOMPLETE'")
	List<Counsel> findCounselByMemberId(@Param("memberId") Integer memberId);

	@Query("select c from Counsel c where c.counselor.id = :counselorId and function('date_format', c.reservationDate, '%Y-%m-%d') = :reservationDate")
	List<Counsel> findCounselByCounselorId(@Param("counselorId") Integer counselorId,
		@Param("reservationDate") String reservationDate);
}
