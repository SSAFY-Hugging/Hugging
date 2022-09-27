package com.ssafy.hugging.counselor.service;

import static com.ssafy.hugging.member.MemberConstant.*;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ssafy.hugging.counselor.domain.Counselor;
import com.ssafy.hugging.counselor.repository.CounselorRepository;

import lombok.RequiredArgsConstructor;

@Service("counselorService")
@RequiredArgsConstructor
@Transactional
public class CounselorService {
	private final CounselorRepository counselorRepository;

	// public List<Counselor> get

	public Counselor getCounselorById(Integer id) {
		Optional<Counselor> counselor = counselorRepository.findById(id);
		if (!counselor.isPresent())
			throw new UsernameNotFoundException(NOT_FOUND_MEMBER_ERROR_MESSAGE);
		return counselor.get();
	}
}
