package com.ssafy.hugging.counsel.dto;

import com.ssafy.hugging.model.Subject;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CounselReserveRequest {
	private Integer counselorId;
	private Integer memberId;
	//	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private String reservationDate;
	private Subject subject;

	//	public static CounselReserveRequest of(Counsel counsel){
	//		return new CounselReserveRequestBuilder()
	//				.counselorId(counsel.getCounselor().getId())
	//				.memberId(counsel.getMember().getId())
	//				.reservationDate(counsel.getReservationDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm")))
	//				.subject(counsel.getSubject())
	//				.build();
	//	}
}
