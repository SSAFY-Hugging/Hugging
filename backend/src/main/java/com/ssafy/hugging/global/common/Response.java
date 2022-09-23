package com.ssafy.hugging.global.common;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.LinkedList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import lombok.Builder;
import lombok.Getter;

@Component
public class Response {
	public ResponseEntity<?> success(Object data, String msg, HttpStatus status) {
		Body body = Body.builder()
			.code(status.value())
			.data(data)
			.message(msg)
			.isSuccess("true")
			.error(Collections.emptyList())
			.build();
		return ResponseEntity.ok(body);
	}

	public ResponseEntity<?> success(Object data) {
		return this.success(data, null, HttpStatus.OK);
	}

	public ResponseEntity<?> success(String msg) {
		return this.success(Collections.emptyList(), msg, HttpStatus.OK);
	}

	public ResponseEntity<?> success() {
		return this.success(Collections.emptyList(), null, HttpStatus.OK);
	}

	public ResponseEntity<?> fail(Object data, String msg, HttpStatus status) {
		Body body = Body.builder()
			.code(status.value())
			.data(data)
			.message(msg)
			.isSuccess("false")
			.error(Collections.emptyList())
			.build();
		return ResponseEntity.ok(body);
	}

	public ResponseEntity<?> fail(String msg, HttpStatus status) {
		return this.fail(Collections.emptyList(), msg, status);
	}

	public ResponseEntity<?> invalidField(LinkedList<LinkedHashMap<String, String>> error) {
		Body body = Body.builder()
			.code(HttpStatus.BAD_REQUEST.value())
			.data(Collections.emptyList())
			.isSuccess("false")
			.message("")
			.error(error)
			.build();
		return ResponseEntity.ok(body);
	}

	@Getter
	@Builder
	static class Body {
		private String isSuccess;
		private int code;
		private String message;
		private Object data;
		private Object error;
		// private int state;
		// private String result;
	}
}
