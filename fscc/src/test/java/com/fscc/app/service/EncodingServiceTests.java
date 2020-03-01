package com.fscc.app.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.fscc.app.domain.EncodeRequest;
import com.fscc.app.domain.EncodedResponse;
import com.fscc.app.exception.GenericException;

/**
 * Integration tests of the encoding service
 * 
 * @author Ison Udoka
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class EncodingServiceTests {
	
	@Autowired
	private EncodingService service;
	
	@Test
	public void testEncodeMessages() {
		//
		try {
			EncodedResponse res = service.encodeMessage(new EncodeRequest(3, "dad"));
			
			assertEquals("gdg", res.getEncodedMessage());
			
			res = service.encodeMessage(new EncodeRequest(28, "the eagle has landed"));
			
			assertEquals("vjg gcing jcu ncpfgf", res.getEncodedMessage());
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	@Test
	public void testInvalidRequests() {
		//
		try {
			EncodedResponse res = service.encodeMessage(null);
			assert(res == null);
		} catch (Exception ex) {
			//
			assert(ex instanceof GenericException);
		}
	}
}
