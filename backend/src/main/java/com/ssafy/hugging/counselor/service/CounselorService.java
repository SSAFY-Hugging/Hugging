package com.ssafy.hugging.counselor.service;

import static com.ssafy.hugging.counselor.CounselorConstant.*;
import static com.ssafy.hugging.member.MemberConstant.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ssafy.hugging.counselor.domain.Counselor;
import com.ssafy.hugging.counselor.domain.CounselorReview;
import com.ssafy.hugging.counselor.dto.CounselorListResponse;
import com.ssafy.hugging.counselor.dto.CounselorLoginRequest;
import com.ssafy.hugging.counselor.dto.CounselorLoginResponse;
import com.ssafy.hugging.counselor.dto.CounselorResponse;
import com.ssafy.hugging.counselor.dto.CounselorReviewRequest;
import com.ssafy.hugging.counselor.dto.CounselorReviewResponse;
import com.ssafy.hugging.counselor.repository.CounselorRepository;
import com.ssafy.hugging.counselor.repository.CounselorReviewRepository;
import com.ssafy.hugging.member.JwtTokenProvider;
import com.ssafy.hugging.member.repository.MemberRepository;
import com.ssafy.hugging.model.Subject;

import lombok.RequiredArgsConstructor;

@Service("counselorService")
@RequiredArgsConstructor
@Transactional
public class CounselorService {
	private final CounselorRepository counselorRepository;
	private final CounselorReviewRepository counselorReviewRepository;
	private final MemberRepository memberRepository;
	private final JwtTokenProvider jwtTokenProvider;

	// 전문분야별 상담사 조회
	public List<CounselorListResponse> getCounselorBySubject(Subject subject) {
		System.out.println(subject);
		List<CounselorListResponse> counselorList = new ArrayList<>();
		for (Counselor counselor : counselorRepository.findCounselorsBySubject(subject)) {
			counselorList.add(
				CounselorListResponse.of(counselor, counselorReviewRepository.findAvgByCounselorId(counselor.getId())));
		}
		return counselorList;
	}

	// 상담사 리뷰 조회
	public List<CounselorReviewResponse> getCounselorReview(Integer counselorId) {
		List<CounselorReviewResponse> counselorReviewResponseList = new ArrayList<>();
		for (CounselorReview counselorReview : counselorReviewRepository.findCounselorReviewsByCounselorId(
			counselorId)) {
			counselorReviewResponseList.add(CounselorReviewResponse.of(counselorReview,
				counselorReviewRepository.findAvgByCounselorId(counselorId)));
		}
		return counselorReviewResponseList;
	}

	// 상담사 리뷰 작성
	public void insertCounselorReview(CounselorReviewRequest counselorReviewRequest) {
		Optional<CounselorReview> existCounselorReview = counselorReviewRepository.findCounselorReviewByMemberIdAndCounselorId(
			counselorReviewRequest.getMemberId(), counselorReviewRequest.getCounselorId());
		if (existCounselorReview.isPresent()) {
			CounselorReview counselorReview = existCounselorReview.get();
			counselorReview.setScore(counselorReviewRequest.getScore());
		} else {
			CounselorReview counselorReview = counselorReviewRepository.save(
				CounselorReview.builder()
					.content(counselorReviewRequest.getContent())
					.score(counselorReviewRequest.getScore())
					.build());
			counselorReview.setMember(memberRepository.findMemberById(counselorReviewRequest.getMemberId())
				.orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_MEMBER_ERROR_MESSAGE)));
			counselorReview.setCounselor(
				counselorRepository.findCounselorById(counselorReviewRequest.getCounselorId()));
		}
	}

	// 상담사 정보 조회
	public CounselorResponse getCounselor(Integer id) {
		Counselor counselor = counselorRepository.findCounselorById(id);
		List<CounselorReviewResponse> counselorReviewResponseList = counselor.getCounselorReviewList()
			.stream()
			.map(counselorReview -> CounselorReviewResponse.of(counselorReview,
				counselorReviewRepository.findAvgByCounselorId(counselor.getId())))
			.collect(Collectors.toList());
		return CounselorResponse.of(counselor,
			counselorReviewRepository.findAvgByCounselorId(id), counselorReviewResponseList);
	}

	public Counselor getCounselorById(Integer id) {
		Optional<Counselor> counselor = counselorRepository.findById(id);
		if (!counselor.isPresent())
			throw new UsernameNotFoundException(NOT_FOUND_MEMBER_ERROR_MESSAGE);
		return counselor.get();
	}

	public String login(CounselorLoginRequest counselorLoginRequest) {
		Counselor counselor = counselorRepository.findCounselorByEmail(counselorLoginRequest.getEmail())
			.orElseThrow(() -> new IllegalArgumentException(MISMATCH_COUNSELOR_EMAIL_ERROR_MESSAGE));
		if (!counselor.confirmPassword(counselorLoginRequest.getPassword())) {
			throw new IllegalArgumentException(MISMATCH_COUNSELOR_PASSWORD_ERROR_MESSAGE);
		}
		return jwtTokenProvider.createToken(String.valueOf(counselor.getId()));
	}

	public CounselorLoginResponse loginResponses(Integer counselorId) {
		Optional<Counselor> counselor = counselorRepository.findById(counselorId);
		if (!counselor.isPresent()) {
			throw new IllegalArgumentException(NOT_FOUND_MEMBER_ERROR_MESSAGE);
		}
		Double average = counselorReviewRepository.findAvgByCounselorId(counselorId);
		if (average == null)
			average = 0.0;
		return new CounselorLoginResponse(counselor.get(), average);
	}
}
