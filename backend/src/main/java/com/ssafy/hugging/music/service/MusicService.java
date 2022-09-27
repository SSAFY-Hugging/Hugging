package com.ssafy.hugging.music.service;

import static com.ssafy.hugging.music.MusicConstant.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ssafy.hugging.music.domain.Music;
import com.ssafy.hugging.music.domain.MusicCategory;
import com.ssafy.hugging.music.dto.MusicCategoryResponse;
import com.ssafy.hugging.music.dto.MusicResponse;
import com.ssafy.hugging.music.repository.MusicCategoryRepository;
import com.ssafy.hugging.music.repository.MusicRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MusicService {
	private final MusicRepository musicRepository;
	private final MusicCategoryRepository musicCategoryRepository;

	public MusicResponse getMusicById(Integer id) {
		Music music = musicRepository.getMusicById(id)
			.orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_MUSIC_ERROR_MESSAGE));
		return new MusicResponse(music);
	}

	public List<MusicCategoryResponse> getAllMusicCategories() {
		return musicCategoryRepository.findAll().stream().map(MusicCategoryResponse::new).collect(Collectors.toList());
	}

	public MusicCategoryResponse getMusicCategoryById(Integer id) {
		MusicCategory musicCategory = musicCategoryRepository.getMusicCategoryById(id)
			.orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_MUSIC_CATEGORY_ERROR_MESSAGE));
		return new MusicCategoryResponse(musicCategory);
	}
}
