package com.ssafy.hugging.psychologicalTest.service;

import com.ssafy.hugging.member.domain.Member;
import com.ssafy.hugging.member.repository.MemberRepository;
import com.ssafy.hugging.psychologicalTest.domain.PsychologicalTestCategory;
import com.ssafy.hugging.psychologicalTest.domain.PsychologicalTestQuestion;
import com.ssafy.hugging.psychologicalTest.domain.PsychologicalTestResult;
import com.ssafy.hugging.psychologicalTest.dto.PsychologicalTestQuestionResponse;
import com.ssafy.hugging.psychologicalTest.dto.PsychologicalTestResultRequest;
import com.ssafy.hugging.psychologicalTest.dto.PsychologicalTestResultResponse;
import com.ssafy.hugging.psychologicalTest.repository.PsychologicalTestCategoryRepository;
import com.ssafy.hugging.psychologicalTest.repository.PsychologicalTestQuestionRepository;
import com.ssafy.hugging.psychologicalTest.repository.PsychologicalTestResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.hugging.member.MemberConstant.NOT_FOUND_MEMBER_ERROR_MESSAGE;
import static com.ssafy.hugging.psychologicalTest.PsychologicalTestConstant.NOT_FOUND_PSYCHOLOGICALTEST_CATEGORY_ERROR_MESSAGE;
import static com.ssafy.hugging.psychologicalTest.PsychologicalTestConstant.NOT_FOUND_PSYCHOLOGICALTEST_RESULT_ERROR_MESSAGE;

@Service("psychologicalTestService")
@RequiredArgsConstructor
@Transactional
public class PsychologicalTestService {
    private final PsychologicalTestQuestionRepository psychologicalTestQuestionRepository;
    private final PsychologicalTestResultRepository psychologicalTestResultRepository;
    private final PsychologicalTestCategoryRepository psychologicalTestCategoryRepository;
    private final MemberRepository memberRepository;

    // 심리검사 문항 조회
    public List<PsychologicalTestQuestionResponse> getPsychologicalTestQuestion(Integer categoryId){
        return psychologicalTestQuestionRepository.findPsychologicalTestQuestionsByPsychologicalTestCategoryId(categoryId)
                .stream().map(PsychologicalTestQuestionResponse::new).collect(Collectors.toList());
    }

    // 심리검사 결과 저장
    public void addPsychologicalTestResult(PsychologicalTestResultRequest psychologicalTestResultRequest) {
        Member member = memberRepository.findMemberById(psychologicalTestResultRequest.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_MEMBER_ERROR_MESSAGE));
        PsychologicalTestCategory psychologicalTestCategory = psychologicalTestCategoryRepository.findPsychologicalTestCategoryById(psychologicalTestResultRequest.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_PSYCHOLOGICALTEST_CATEGORY_ERROR_MESSAGE));
        PsychologicalTestResult psychologicalTestResult = PsychologicalTestResult.from(psychologicalTestResultRequest, member, psychologicalTestCategory);
        psychologicalTestResultRepository.save(psychologicalTestResult);
    }

    // 심리검사 결과 조회
    public List<PsychologicalTestResultResponse> getPsychologicalTestResult(Integer memberId){
        return psychologicalTestResultRepository.getPsychologicalTestResultByMemberId(memberId)
                .stream().map(PsychologicalTestResultResponse::new).collect(Collectors.toList());
    }
}
