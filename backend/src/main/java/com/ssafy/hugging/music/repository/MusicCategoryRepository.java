package com.ssafy.hugging.music.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.hugging.music.domain.MusicCategory;

public interface MusicCategoryRepository extends JpaRepository<MusicCategory, Integer> {
	Optional<MusicCategory> getMusicCategoryById(Integer id);

	List<MusicCategory> findAll();
}
