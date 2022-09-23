package com.ssafy.hugging.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.hugging.member.domain.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findByEmail(String email);
}
