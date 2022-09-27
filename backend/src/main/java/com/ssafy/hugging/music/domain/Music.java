package com.ssafy.hugging.music.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.ssafy.hugging.favorite.domain.FavoriteMusic;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Music {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String name;
	private String tag;
	private String musicUrl;
	private String thumbnailUrl;
	@Enumerated(EnumType.STRING)
	private Type type;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "categoryId")
	private MusicCategory musicCategory;

	@OneToMany(mappedBy = "music")
	private List<FavoriteMusic> favoriteMusicList = new ArrayList<>();

	@OneToMany(mappedBy = "music")
	private List<MusicHits> musicHitsList = new ArrayList<>();
}
