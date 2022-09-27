package com.ssafy.hugging.global.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import com.ssafy.hugging.global.extractor.AuthorizationExtractor;
import com.ssafy.hugging.member.JwtTokenProvider;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class BearerAuthInterceptor implements HandlerInterceptor {
	private AuthorizationExtractor authorizationExtractor;
	private JwtTokenProvider jwtTokenProvider;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
		System.out.println(">>> interceptor.preHande 호출");
		String token = authorizationExtractor.extract(request, "Bearer");
		if (StringUtils.isEmpty(token)) {
			return true;
		}
		if (!jwtTokenProvider.validateToken(token)) {
			throw new IllegalArgumentException("토큰이 유효하지 않습니다.");
		}

		String id = jwtTokenProvider.getMemberId(token);
		request.setAttribute("id", id);
		return true;
	}
}
