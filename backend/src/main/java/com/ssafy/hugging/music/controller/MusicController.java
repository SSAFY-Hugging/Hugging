package com.ssafy.hugging.music.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hugging.global.common.Response;
import com.ssafy.hugging.music.service.MusicService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/music")
@RequiredArgsConstructor
public class MusicController {

	private final MusicService musicService;
	private final Response response;

	@GetMapping("/{id}")
	@ApiOperation(value = "음악 단건 조회", notes = "음악 PK 값으로 음악 조회")
	public ResponseEntity<?> getMusicInfo(@PathVariable Integer id) {
		return response.success(musicService.getMusicById(id), "get music by id success", HttpStatus.OK);
	}

	@GetMapping("/category")
	@ApiOperation(value = "카테고리 전제 조회", notes = "카테고리 전제 목록 조회")
	public ResponseEntity<?> getAllCategories() {
		return response.success(musicService.getAllMusicCategories(), "get all categories success", HttpStatus.OK);
	}

	@GetMapping("/category/{id}")
	@ApiOperation(value = "카테고리 단건 조회", notes = "카테고리 id값으로 단건 조회")
	public ResponseEntity<?> getMusicCategoryById(@PathVariable Integer id) {
		return response.success(musicService.getMusicCategoryById(id), "get music category success", HttpStatus.OK);
	}
}
