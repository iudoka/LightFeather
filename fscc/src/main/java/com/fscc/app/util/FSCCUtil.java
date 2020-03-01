package com.fscc.app.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Utility class providing useful functionality utilized by the application
 * 
 * @author Ison Udoka
 *
 */
public abstract class FSCCUtil
{
	public static final ObjectMapper MAPPER = new ObjectMapper();
	public static final String VALUE_NULL = "null";
	
	/**
	 * Encodes the given string by shifting individual characters.
	 * Function only shifts alphabetical characters and does not mutate
	 * non-alphabetical characters (ex: spaces ' ').
	 * 
	 * Preserves the casing of the character (upper or lower case)
	 * 
	 * @param shift - amount to shift the string
	 * @param str - the string to shift
	 * @return a newly shifted string
	 */
	public static String encodeString(int shift, String str) {
		//
		//return encodeSerial(shift, str);
		return encodeStream(shift, str);
	}
	
	/**
	 * Does the shift encoding in a serial manner 
	 * looping through the entire string in memory.
	 * This could be resource intensive with a longer message.
	 * 
	 * @param shift - amount to shift the string
	 * @param str - the string to shift
	 * @return a newly shifted string
	 */
	public static String encodeSerial(int shift, String str) {
		//
		StringBuilder encodedString = new StringBuilder();
		
		for (int i = 0; i < str.length(); i++) {
			//
			encodedString.append(doCharShift(str.charAt(i), shift));
		}
		
		return encodedString.toString();
	}
	
	/**
	 * Does the shift encoding using a stream.
	 * This should bahave better and a more optimized
	 * way of shifting the message.
	 * 
	 * @param shift - amount to shift the string
	 * @param str - the string to shift
	 * @return a newly shifted string
	 */
	public static String encodeStream(int shift, String str) {
		//
		return str.chars().mapToObj(c -> doCharShift((char)c, shift))
				.map(c -> Character.toString(c))
				.collect(StringBuilder::new,StringBuilder::append,StringBuilder::append)
				.toString();
	}
	
	/**
	 * Function does the actual character shifting
	 * 
	 * - only shifts alphabets
	 * - preserves case
	 * - handles positive and negative shift
	 * - handles shifts > 26
	 * 
	 * @param currChar - the current character to shift
	 * @param shift - the amount to shift it by
	 * @return the shifted character
	 */
	public static char doCharShift(char currChar, int shift) {
		//
		if (isAlphabet(currChar)) {
			//
			boolean upperCase = Character.isUpperCase(currChar); // preserve case
			currChar = Character.toLowerCase(currChar);
			int a = 'a';
			int encodedCharInt = (currChar + shift - a) % 26 + a;
			char encodedChar = (char) encodedCharInt;
			
			return upperCase ? Character.toUpperCase(encodedChar) : encodedChar;
		}
		
		// ignore none alphabet characters
		return currChar;
	}
	
	
	/**
	 * Checks if character is an alphabet
	 * 
	 * @param character - character to check
	 * @return true character is an alphabet
	 */
	public static boolean isAlphabet(char character) {
		//
		int numericValue = Character.getNumericValue(character);
		
		return (numericValue >= 10 && numericValue <= 35);
	}
	
	/**
	 * Empties given string if it is null
	 * 
	 * @param value - string value to evaluate  
	 * @return empty string if value is null otherwise the 
	 */
	public static String emptyIfNull(String value) {
		//
		if (value == null) {
			return "";
		}
		
		return value;
	}
	
	/**
	 * Save the given contents to file
	 * 
	 * @param fileName - file location where to save contents
	 * @param contents - file contents
	 * @return true if saved successfully
	 */
	public static boolean saveToFile(String fileName, String contents) {
		//
		try {
			Path path = Paths.get(fileName);
			
			Files.write(path, contents.getBytes());
		} catch (IOException ex) {
			//
			ex.printStackTrace();
			return false;
		}
		
		return true;
	}

	/**
	 * Shows the content of any object in JSON format
	 * 
	 * @param object
	 * @return
	 */
	public static String toString(Object object) {
		if (object == null) {
			return VALUE_NULL;
		}

		try {
			return MAPPER.writeValueAsString(object);
		} catch (Exception e) {
			throw new IllegalArgumentException(
					"Failed in writing content of object " + object + " of type " + object.getClass() + " using JSON Object Mapper", e);
		}
	}
}
