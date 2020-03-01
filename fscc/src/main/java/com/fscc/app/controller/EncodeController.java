package com.fscc.app.controller;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fscc.app.domain.EncodeRequest;
import com.fscc.app.domain.EncodedResponse;
import com.fscc.app.exception.GenericException;
import com.fscc.app.service.EncodingService;

/**
 * REST Controller which provides an endpoint for calls to 
 * encode messages with a shift cipher
 * 
 * @author Ison Udoka
 *
 */
@RestController
@RequestMapping("/api")
public class EncodeController extends AbstractController {

	@Autowired
	private EncodingService service;

	@PostMapping("/encode")
	public EncodedResponse encode(@RequestBody EncodeRequest request, HttpSession session, HttpServletResponse response)
			throws GenericException {
		//
		logger.info("Encoding Request Received: {}", ReflectionToStringBuilder.toString(request));

		return service.encodeMessage(request);
	}
}
