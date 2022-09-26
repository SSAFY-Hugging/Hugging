package com.ssafy.hugging.counsel.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.hugging.counsel.domain.Counsel;

@Repository
public interface CounselRepository extends JpaRepository<Counsel, Integer> {
	Optional<Counsel> findCounselByEmail(String email);
}
