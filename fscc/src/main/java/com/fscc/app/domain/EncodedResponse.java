package com.fscc.app.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

public class EncodedResponse {
	//
	@JsonProperty("EncodedMessage")
	private String encodedMessage;
	
	public EncodedResponse(String encodedMessage) {
		//
		this.encodedMessage = encodedMessage;
	}

	public String getEncodedMessage() {
		return encodedMessage;
	}

	public void setEncodedMessage(String encodedMessage) {
		this.encodedMessage = encodedMessage;
	}
}
