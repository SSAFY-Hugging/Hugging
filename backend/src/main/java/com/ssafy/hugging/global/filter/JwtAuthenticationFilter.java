package com.ssafy.hugging.global.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.GenericFilter;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.ssafy.hugging.member.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilter {

	private final JwtTokenProvider jwtTokenProvider;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws
		IOException,
		ServletException {
		String token = jwtTokenProvider.resolveToken((HttpServletRequest)request);

		if (token != null && jwtTokenProvider.validateToken(token)) {
			Authentication auth = jwtTokenProvider.getAuthentication(token);
			SecurityContextHolder.getContext().setAuthentication(auth);
		}
		System.out.println(request);
		System.out.println(response);
		chain.doFilter(request, response);
	}
}
