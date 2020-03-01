package com.fscc.app.domain;

import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Encapsulates an Encoding Request
 * 
 * @author Ison Udoka
 *
 */
public class EncodeRequest {
	//
	@JsonProperty("Shift")
	private Integer shift;
	
	@JsonProperty("Message")
	private String message;
	
	public EncodeRequest(Integer shift, String message) {
		//
		this.shift = shift;
		this.message = message;
	}

	public Integer getShift() {
		return shift;
	}

	public void setShift(Integer shift) {
		this.shift = shift;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String toString() {
		return ReflectionToStringBuilder.toString(this);
	}
}
