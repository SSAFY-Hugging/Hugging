package com.ssafy.hugging.psychologicalTest.controller;

import com.ssafy.hugging.global.common.Response;
import com.ssafy.hugging.psychologicalTest.dto.PsychologicalTestResultRequest;
import com.ssafy.hugging.psychologicalTest.service.PsychologicalTestService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.hugging.psychologicalTest.PsychologicalTestConstant.*;

@RestController
@RequestMapping("/psychologicalTest")
@RequiredArgsConstructor
public class PsychologicalTestController {

    private final Response response;
    private final PsychologicalTestService psychologicalTestService;

    @PostMapping("/result")
    @ApiOperation(value = "심리테스트 결과 저장", notes = "심리테스트 결과 저장")
    public ResponseEntity<?> addPsychologicalTestResult(@RequestBody PsychologicalTestResultRequest psychologicalTestResultRequest){
        psychologicalTestService.addPsychologicalTestResult(psychologicalTestResultRequest);
        return response.success(ADD_PSYCHOLOGICALTEST_RESULT_SUCCESS_MESSAGE);
    }

    @GetMapping("/result/{memberId}")
    @ApiOperation(value = "심리테스트 결과 조회", notes = "회원 id 값으로 심리테스트 결과 조회")
    public ResponseEntity<?> getPsychologicalTestResult(@PathVariable Integer memberId){
        return response.success(psychologicalTestService.getPsychologicalTestResult(memberId), GET_PSYCHOLOGICALTEST_RESULT_SUCCESS_MESSAGE
                , HttpStatus.OK);
    }

    @GetMapping("/question/{categoryId}")
    @ApiOperation(value = "심리테스트 문항 조회", notes = "카테고리 별 심리테스트 문항 조회")
    public ResponseEntity<?> getPsychologicalTestQuestion(@PathVariable Integer categoryId){
        return response.success(psychologicalTestService.getPsychologicalTestQuestion(categoryId), GET_PSYCHOLOGICALTEST_QUESTION_SUCCESS_MESSAGE, HttpStatus.OK);
    }
}
