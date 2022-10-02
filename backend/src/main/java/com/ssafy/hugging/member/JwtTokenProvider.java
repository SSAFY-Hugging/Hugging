package com.ssafy.hugging.member;

import java.util.Base64;
import java.util.Date;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import com.ssafy.hugging.member.service.MemberService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
	@Value("${spring.jwt.secretKey}")
	private String secretKey;
	private final long tokenValidTime = 30 * 60 * 1000L;    // 토큰 유효시간 30분
	private final MemberService memberService;

	@PostConstruct
	protected void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}

	/**
	 * JWT 토큰 생성 메서드
	 * @param email 사용자 이메일
	 * @return JWT 토큰
	 */
	public String createToken(String email) {
		Claims claims = Jwts.claims().setSubject(email);
		Date now = new Date();

		return Jwts.builder()
			.setClaims(claims)
			.setIssuedAt(now)
			.setExpiration(new Date(now.getTime() + tokenValidTime))
			.signWith(SignatureAlgorithm.HS256, secretKey)
			.compact();
	}

	/**
	 * TODO : Spring Security 알아보고 추가해야할지 찾기
	 * JWT 토큰에서 인증 정보 조회
	 * @param token JWT 토큰
	 * @return 인증 정보
	 */

	public Authentication getAuthentication(String token) {
		UserDetails userDetails = memberService.loadUserByUsername(getMemberId(token));
		return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
	}

	/**
	 * 토큰에서 회원 정보 추출
	 * @param token JWT 토큰
	 * @return 회원 정보
	 */
	public String getMemberId(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
	}

	/**
	 * request의 헤더에서 토큰값을 가져온다.
	 * @param req
	 * @return
	 */
	public String resolveToken(HttpServletRequest req) {
		return req.getHeader("Authorization");
	}

	/**
	 * 토큰의 유효성 + 만료일자 확인
	 * @param jwtToken JWT 토큰
	 * @return 유효성 여부
	 */
	public boolean validateToken(String jwtToken) {
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
			return !claims.getBody().getExpiration().before(new Date());
		} catch (Exception e) {
			return false;
		}
	}
}
