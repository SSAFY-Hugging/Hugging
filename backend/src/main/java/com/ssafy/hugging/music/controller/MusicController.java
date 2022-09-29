package com.ssafy.hugging.music.controller;

import static com.ssafy.hugging.music.MusicConstant.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hugging.global.common.Response;
import com.ssafy.hugging.music.dto.MusicReviewRequest;
import com.ssafy.hugging.music.service.MusicService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/musics")
@RequiredArgsConstructor
public class MusicController {

	private final MusicService musicService;
	private final Response response;

	@GetMapping("/{id}")
	@ApiOperation(value = "음악 단건 조회", notes = "음악 PK 값으로 음악 조회")
	public ResponseEntity<?> getMusicInfo(@PathVariable Integer id) {
		return response.success(musicService.findMusicById(id), GET_MUSIC_INFO_SUCCESS_MESSAGE, HttpStatus.OK);
	}

	@GetMapping("/category")
	@ApiOperation(value = "카테고리 전제 조회", notes = "카테고리 전제 목록 조회")
	public ResponseEntity<?> getAllCategories() {
		return response.success(musicService.getAllMusicCategories(), GET_ALL_CATEGORIES_SUCCESS_MESSAGE,
			HttpStatus.OK);
	}

	@GetMapping("/category/{id}")
	@ApiOperation(value = "카테고리 단건 조회", notes = "카테고리 id값으로 단건 조회")
	public ResponseEntity<?> getMusicCategoryById(@PathVariable Integer id) {
		return response.success(musicService.getMusicCategoryById(id), GET_MUSIC_CATEGORY_BY_ID_SUCCESS_MESSAGE,
			HttpStatus.OK);
	}

	@GetMapping("/getTophits")
	@ApiOperation(value = "조회수 탑 10 조회", notes = "조회수 순 음악 10개 조회")
	public ResponseEntity<?> getTop10Music() {
		return response.success(musicService.getTop10(), GET_TOP_10_MUSIC_SUCCESS_MESSAGE, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	@ApiOperation(value = "음악 조회수 증가", notes = "음악 조회수 증가")
	public ResponseEntity<?> updateMusicHits(@PathVariable Integer id) {
		musicService.updateMusicHits(id);
		return response.success(UPDATE_MUSIC_HITS_SUCCESS_MESSAGE);
	}

	@PostMapping("/review")
	@ApiOperation(value = "음악 리뷰 작성", notes = "음악 리뷰 작성")
	public ResponseEntity<?> addMusicReview(@RequestBody MusicReviewRequest musicReviewRequest) {
		musicService.addMusicReview(musicReviewRequest);
		return response.success(ADD_MUSIC_REVIEW_SUCCESS_MESSAGE);
	}
}
