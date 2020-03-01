package com.fscc.app.util;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.Test;

/**
 * Unit tests of the encoding logic
 * 
 * @author Ison Udoka
 */
public class FSCCUtilTests {
	//	
	@Test
	public void testSimpleEncoding() {
		// simple test
		String res = FSCCUtil.encodeString(29, "dad");
		
		assertEquals("gdg", res);
	}
	
	@Test
	public void testSentence() {
		// test sentences
		String res = FSCCUtil.encodeString(28, "the eagle has landed");
		
		assertEquals("vjg gcing jcu ncpfgf", res);
	}
	
	@Test
	public void testPreserveSpaces() {
		// test preserving spaces
		String res = FSCCUtil.encodeString(3, "a b c d");
		
		assertEquals("d e f g", res);
	}
	
	@Test
	public void testPreserveCase() {
		// test preserve case
		String res = FSCCUtil.encodeString(3, "A b C");
		
		assertEquals("D e F", res);
	}
	
	@Test
	public void testEdgeCondition() {
		// test z wraps around to a with shifts > 26
		String res = FSCCUtil.encodeString(29, "X y Z");
		
		assertEquals("A b C", res);
	}
}
