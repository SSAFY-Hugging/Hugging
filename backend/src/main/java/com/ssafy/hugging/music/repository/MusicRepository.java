package com.ssafy.hugging.music.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.hugging.music.domain.Music;

public interface MusicRepository extends JpaRepository<Music, Integer> {
	Optional<Music> getMusicById(Integer id);
}
