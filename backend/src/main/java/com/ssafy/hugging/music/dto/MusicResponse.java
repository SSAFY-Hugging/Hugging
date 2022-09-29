package com.ssafy.hugging.music.dto;

import com.ssafy.hugging.music.domain.Category;
import com.ssafy.hugging.music.domain.Music;
import com.ssafy.hugging.music.domain.Type;

import lombok.Getter;

@Getter
public class MusicResponse {
	private final Integer id;
	private final String name;
	private final String tag;
	private final String musicUrl;
	private final String thumbnailUrl;
	private final Type type;
	private final Category category;
	private final Integer hits;

	public MusicResponse(Music music) {
		id = music.getId();
		name = music.getName();
		tag = music.getTag();
		musicUrl = music.getMusicUrl();
		thumbnailUrl = music.getThumbnailUrl();
		hits = music.getHits();
		type = music.getType();
		category = music.getMusicCategory().getName();
	}
}
