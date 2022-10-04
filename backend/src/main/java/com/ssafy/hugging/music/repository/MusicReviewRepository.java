package com.ssafy.hugging.music.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.hugging.music.domain.MusicReview;

public interface MusicReviewRepository extends JpaRepository<MusicReview, Integer> {
	Optional<MusicReview> findMusicReviewByMemberIdAndMusicId(Integer memberId, Integer musicId);
}
