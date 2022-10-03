package com.ssafy.hugging.counselor.dto;

import com.ssafy.hugging.counselor.domain.Counselor;
import com.ssafy.hugging.model.Gender;
import com.ssafy.hugging.model.Subject;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CounselorListResponse {
    private Integer counselorId;
    private String availableTime;
    private String career;
    private String certificate;
    private String email;
    private String explanation;
    private Gender gender;
    private String name;
    private Subject subject;
    private String profileImage;
    private Double average;

    public static CounselorListResponse of(Counselor counselor, Double average) {
        return new CounselorListResponse.CounselorListResponseBuilder()
                .counselorId(counselor.getId())
                .availableTime(counselor.getAvailableTime())
                .career(counselor.getCareer())
                .certificate(counselor.getCertificate())
                .email(counselor.getEmail())
                .explanation(counselor.getExplanation())
                .gender(counselor.getGender())
                .name(counselor.getName())
                .subject(counselor.getSubject())
                .profileImage(counselor.getProfileImage())
                .average(average)
                .build();
    }
}
