package com.ssafy.hugging.counsel.service;

import static com.ssafy.hugging.member.MemberConstant.*;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.hugging.counsel.domain.Counsel;
import com.ssafy.hugging.counsel.dto.CounselReservationResponse;
import com.ssafy.hugging.counsel.dto.CounselReserveRequest;
import com.ssafy.hugging.counsel.repository.CounselRepository;
import com.ssafy.hugging.counselor.service.CounselorService;
import com.ssafy.hugging.member.repository.MemberRepository;
import com.ssafy.hugging.model.Status;

import lombok.RequiredArgsConstructor;

@Service("counselService")
@RequiredArgsConstructor
@Transactional
public class CounselService {
	private final CounselRepository counselRepository;
	private final MemberRepository memberRepository;
	private final CounselorService counselorService;

	// 상담 예약
	public void insertCounsel(CounselReserveRequest counselReserveRequest) {
		Counsel counsel = counselRepository.save(Counsel.builder()
			.reservation_date(counselReserveRequest.getReservationDate())
			.subject(counselReserveRequest.getSubject())
			.status(Status.INCOMPLETE)
			.build());
		counsel.setCounselor(counselorService.getCounselorById(counselReserveRequest.getCounselorId()));
		counsel.setMember(memberRepository.findMemberById(counselReserveRequest.getMemberId())
			.orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_MEMBER_ERROR_MESSAGE)));
	}

	// 상담 예약 취소
	public void deleteCounsel(Integer id) {
		counselRepository.deleteById(id);
	}

	// 상담 예약 내역
	public List<CounselReservationResponse> getCounselByEmail(Integer memberId) {
		List<CounselReservationResponse> counselList = new ArrayList<>();
		for (Counsel counsel : counselRepository.findCounselByMemberId(memberId)) {
			counselList.add(CounselReservationResponse.of(counsel));
		}
		return counselList;
	}

	// 상담 스케줄 조회
	public List<CounselReservationResponse> getCounselByCounselorId(Integer counselorId, String reservationDate) {
		List<CounselReservationResponse> counselList = new ArrayList<>();
		for (Counsel counsel : counselRepository.findCounselByCounselorId(counselorId, reservationDate)) {
			counselList.add(CounselReservationResponse.of(counsel));
		}
		return counselList;
	}
}
