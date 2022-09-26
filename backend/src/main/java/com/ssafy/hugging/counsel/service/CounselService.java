package com.ssafy.hugging.counsel.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.hugging.counsel.repository.CounselRepository;

import lombok.RequiredArgsConstructor;

@Service("counselService")
@RequiredArgsConstructor
@Transactional
public class CounselService {
	private final CounselRepository counselRepository;
}
