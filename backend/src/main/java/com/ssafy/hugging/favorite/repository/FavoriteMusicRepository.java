package com.ssafy.hugging.favorite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.hugging.favorite.domain.FavoriteMusic;

public interface FavoriteMusicRepository extends JpaRepository<FavoriteMusic, Integer> {
	void deleteFavoriteMusicByMemberIdAndMusicId(Integer memberId, Integer musicId);
}
