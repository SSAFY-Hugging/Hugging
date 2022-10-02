package com.ssafy.hugging.music.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.hugging.music.domain.Category;
import com.ssafy.hugging.music.domain.MusicCategory;

import lombok.Getter;

@Getter
public class MusicCategoryResponse {
	private final Integer id;
	private final String title;
	private final Category category;

	private final List<MusicResponse> musicResponseList = new ArrayList<>();

	public MusicCategoryResponse(MusicCategory musicCategory) {
		id = musicCategory.getId();
		title = musicCategory.getTitle();
		category = musicCategory.getName();
		musicResponseList.addAll(
			musicCategory.getMusicList().stream().map(MusicResponse::new).collect(Collectors.toList()));
	}
}
