package com.fscc.app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR, reason = "Internal Server Error")
public class GenericException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7809513305078217824L;

	public GenericException(Throwable cause) {
        super(cause);
    }
}
