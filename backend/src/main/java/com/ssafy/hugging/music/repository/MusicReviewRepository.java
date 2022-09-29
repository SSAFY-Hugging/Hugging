package com.ssafy.hugging.music.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.hugging.music.domain.MusicReview;

public interface MusicReviewRepository extends JpaRepository<MusicReview, Integer> {
}
