package com.fscc.app.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.fscc.app.domain.EncodeRequest;
import com.fscc.app.domain.EncodedResponse;
import com.fscc.app.exception.GenericException;
import com.fscc.app.util.FSCCUtil;

/**
 * Encoding Service used to encode given messages by shifting them using a character shift algorithm.
 * 
 * It accepts an EncodeRequest and returns back an EncodedResponse
 *
 * @author Ison Udoka
 */
@Service
public class EncodingService {
	private static final Logger logger = LoggerFactory.getLogger(EncodingService.class);
	
	public EncodedResponse encodeMessage(EncodeRequest request) throws GenericException {
		//
		try {
			logger.debug("Encoding {} by shifting {}", request.getMessage(), request.getShift());
			String encoded = FSCCUtil.encodeString(request.getShift(), request.getMessage());
			
			FSCCUtil.saveToFile("encoded.json", encoded);
			
			return new EncodedResponse(encoded);
		} catch (Exception ex) {
			throw new GenericException(ex);
		}
	}
}
