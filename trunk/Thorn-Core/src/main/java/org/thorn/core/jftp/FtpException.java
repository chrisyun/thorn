package org.thorn.core.jftp;
/**
 * <p>文件名称: FtpException.java</p>
 * <p>文件描述: 自定义ftp上传异常类</p>
 * <p>版权所有: 版权所有(C)2010</p>
 * <p>内容摘要: 对ftp工具抛出的异常做统一封装</p>
 * <p>其他说明: 其它内容的说明</p>
 * <p>完成日期: 2012-3-13</p>
 * <p>修改记录1:</p>
 * <pre>
 *    修改日期:
 *    修 改 人:
 *    修改内容:
 * </pre>
 * <p>修改记录2：…</p>
 * @author  chenyun
 */
public class FtpException extends Exception {
	
	public FtpException() {
		super();
	}
	
	public FtpException(String message) {
		super(message);
	}
	
	public FtpException(String message, Throwable cause) {
		super(message, cause);
	}
	
}

