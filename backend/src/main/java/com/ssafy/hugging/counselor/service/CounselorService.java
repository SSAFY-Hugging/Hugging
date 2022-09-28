package com.ssafy.hugging.counselor.service;

import static com.ssafy.hugging.member.MemberConstant.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ssafy.hugging.counselor.domain.Counselor;
import com.ssafy.hugging.counselor.domain.CounselorReview;
import com.ssafy.hugging.counselor.dto.CounselorResponse;
import com.ssafy.hugging.counselor.dto.CounselorReviewRequest;
import com.ssafy.hugging.counselor.dto.CounselorReviewResponse;
import com.ssafy.hugging.counselor.repository.CounselorRepository;
import com.ssafy.hugging.counselor.repository.CounselorReviewRepository;
import com.ssafy.hugging.member.service.MemberService;
import com.ssafy.hugging.model.Subject;

import lombok.RequiredArgsConstructor;

@Service("counselorService")
@RequiredArgsConstructor
@Transactional
public class CounselorService {
	private final CounselorRepository counselorRepository;
	private final CounselorReviewRepository counselorReviewRepository;
	private final MemberService memberService;

	// 전문분야별 상담사 조회
	public List<CounselorResponse> getCounselorBySubject(Subject subject) {
		System.out.println(subject);
		List<CounselorResponse> counselorList = new ArrayList<>();
		for (Counselor counselor : counselorRepository.findCounselorsBySubject(subject)) {
			// counselorList.add(CounselorResponse.of(counselor));
			// Double average = 0.0, cnt = 0.0;
			// for (CounselorReview counselorReview : counselorReviewRepository.findCounselorReviewsByCounselorId(
			// 	counselor.getId())) {
			// 	average += counselorReview.getScore();
			// 	cnt++;
			// }
			// average /= cnt;
			counselorList.add(
				CounselorResponse.of(counselor, counselorReviewRepository.findAvgByCounselorId(counselor.getId())));
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
		CounselorReview counselorReview = counselorReviewRepository.save(CounselorReview.builder()
			.content(counselorReviewRequest.getContent())
			// .reg_date(LocalDateTime.now())
			.score(counselorReviewRequest.getScore())
			.build());
		counselorReview.setMember(memberService.getMemberById(counselorReviewRequest.getMemberId()));
		counselorReview.setCounselor(counselorRepository.findCounselorById(counselorReviewRequest.getCounselorId()));
	}

	// 상담사 정보 조회
	public Counselor getCounselorById(Integer id) {
		Optional<Counselor> counselor = counselorRepository.findById(id);
		if (!counselor.isPresent())
			throw new UsernameNotFoundException(NOT_FOUND_MEMBER_ERROR_MESSAGE);
		return counselor.get();
	}
}
