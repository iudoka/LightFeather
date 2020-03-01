package com.fscc.app.controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Base Controller for all our app controllers.
 * Can be used to add any functionality or attributes that is common across
 * all the app controllers
 * 
 * @author Ison Udoka
 *
 */
public abstract class AbstractController {

	protected Logger logger = LoggerFactory.getLogger(getClass());
}