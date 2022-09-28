package com.ssafy.hugging.music.service;

import static com.ssafy.hugging.music.MusicConstant.*;
import static com.ssafy.hugging.member.MemberConstant.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.hugging.member.domain.Member;
import com.ssafy.hugging.member.repository.MemberRepository;
import com.ssafy.hugging.music.domain.Music;
import com.ssafy.hugging.music.domain.MusicCategory;
import com.ssafy.hugging.music.domain.MusicReview;
import com.ssafy.hugging.music.dto.MusicCategoryResponse;
import com.ssafy.hugging.music.dto.MusicResponse;
import com.ssafy.hugging.music.dto.MusicReviewRequest;
import com.ssafy.hugging.music.repository.MusicCategoryRepository;
import com.ssafy.hugging.music.repository.MusicRepository;
import com.ssafy.hugging.music.repository.MusicReviewRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MusicService {
	private final MusicRepository musicRepository;
	private final MusicCategoryRepository musicCategoryRepository;
	private final MusicReviewRepository musicReviewRepository;
	private final MemberRepository memberRepository;

	public MusicResponse findMusicById(Integer id) {
		Music music = musicRepository.findMusicById(id)
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

	public List<MusicResponse> getTop10() {
		return musicRepository.findTop10ByOrderByHitsDesc()
			.stream()
			.map(MusicResponse::new)
			.collect(Collectors.toList());
	}

	@Transactional
	public void updateMusicHits(Integer id) {
		Music music = musicRepository.findMusicById(id)
			.orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_MUSIC_ERROR_MESSAGE));
		music.updateHits();
	}

	@Transactional
	public void addMusicReview(MusicReviewRequest musicReviewRequest) {
		Member member = memberRepository.findMemberById(musicReviewRequest.getMemberId())
			.orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_MEMBER_ERROR_MESSAGE));
		Music music = musicRepository.findMusicById(musicReviewRequest.getMusicId())
			.orElseThrow(() -> new IllegalArgumentException(NOT_FOUND_MUSIC_ERROR_MESSAGE));
		MusicReview musicReview = MusicReview.from(musicReviewRequest, music, member);
		musicReviewRepository.save(musicReview);
	}
}
