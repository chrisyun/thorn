package org.thorn.core.util;

import org.apache.commons.lang.math.RandomUtils;
import org.springframework.util.Assert;

/**
 * 
 * @ClassName: StringUtils 
 * @Description: 
 * @author chenyun
 * @date 2012-5-4 下午02:15:03 
 *
 */
public class StringUtils {
	
	private static char[] numbersAndLetters = ("0123456789abcdefghijklmnopqrstuvwxyz"
			+ "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ")
			.toCharArray();

	public static final String randomString(int length) {
		Assert.isTrue(length > 0, "The input parameters not legal");
		
		char[] randBuffer = new char[length];
		
		for (int i = 0; i < randBuffer.length; i++) {
			randBuffer[i] = numbersAndLetters[RandomUtils.nextInt(71)];
		}
		
		return new String(randBuffer);
	}
	
}

