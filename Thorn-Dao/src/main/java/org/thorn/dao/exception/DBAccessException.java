package org.thorn.dao.exception;

/**
 * 
 * @ClassName: DBAccessException 
 * @Description: TODO
 * @author chenyun
 * @date 2012-4-26 上午11:21:48 
 *
 */
public class DBAccessException extends Exception {
	
	public DBAccessException() {
		super();
	}
	
	public DBAccessException(String msg) {
		super(msg);
	}
	
	public DBAccessException(Throwable cause) {
		super(cause);
	}
	
	public DBAccessException(String msg, Throwable cause) {
		super(cause);
	}
	
	
}

