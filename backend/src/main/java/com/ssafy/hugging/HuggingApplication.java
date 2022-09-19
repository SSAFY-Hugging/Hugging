package com.ssafy.hugging;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class HuggingApplication {

	public static void main(String[] args) {
		SpringApplication.run(HuggingApplication.class, args);
	}

}
