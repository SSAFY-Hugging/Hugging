package com.ssafy.hugging.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	// Bearer Auth 방식 사용시 특정 uri로 요청시 요청 인터셉트후 id 추가
	// 위 방식 사용시 적용

	// private final BearerAuthInterceptor bearerAuthInterceptor;
	//
	// public WebMvcConfig(BearerAuthInterceptor bearerAuthInterceptor) {
	// 	this.bearerAuthInterceptor = bearerAuthInterceptor;
	// }
	//
	// public void addInterceptors(InterceptorRegistry registry){
	// 	System.out.println(">>> 인터셉터 등록");
	// 	registry.addInterceptor(bearerAuthInterceptor).addPathPatterns("/info");
	// }

	//  Interceptor를 이용해서 처리하므로 전역의 Cross Origin 처리를 해준다.
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOrigins("*")
			.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
			.maxAge(6000);
	}
}
