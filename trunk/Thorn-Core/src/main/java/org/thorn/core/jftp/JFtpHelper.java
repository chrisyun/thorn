package org.thorn.core.jftp;

import java.io.File;

/**
 * <p>文件名称: JFtpHelper.java</p>
 * <p>文件描述: FTP操作器的辅助类</p>
 * <p>版权所有: 版权所有(C)2010</p>
 * <p>内容摘要: 提供单个文件的下载和上传</p>
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
public abstract class JFtpHelper {

	/** 用户名 */
	protected String userName;
	/** 密码 */
	protected String password;
	/**服务器主机地址 */
	protected String serverIp;
	/** 端口号 */
	protected int port = 21;
	
	public JFtpHelper() {
		
	}
	/**
	 * 
	 * @param userName 用户名
	 * @param password 密码
	 * @param serverIp 服务器主机地址
	 */
	public JFtpHelper(String userName, 
			String password, String serverIp) {
		this.userName = userName;
		this.password = password;
		this.serverIp = serverIp;
	}
	
	/**
	 * 
	 * @param userName 用户名
	 * @param password 密码
	 * @param serverIp 服务器主机地址
	 * @param port	         端口号
	 */
	public JFtpHelper(String userName, 
			String password, String serverIp, int port) {
		this(userName, password, serverIp);
		this.port = port;
	}
	
	/**
	 * 
	 * @author：chenyun 	        
	 * @date：2012-3-13
	 * @Description：
	 * @return 登陆成功返回true，失败则返回false
	 */
	public abstract boolean login();
	
	/**
	 * 
	 * @author：chenyun 	        
	 * @date：2012-3-13
	 * @Description：关闭ftp连接
	 */
	public abstract void closeConnect();
	
	/**
	 * 
	 * @author：chenyun 	        
	 * @date：2012-3-13
	 * @Description：		上传文件
	 * @param file			上传的文件
	 * @param targetFolder	目标文件夹
	 * @throws FtpException ftp异常
	 */
	public abstract void upload(File file, String targetFolder) throws FtpException;
	
	/**
	 * 
	 * @author：chenyun 	        
	 * @date：2012-3-13
	 * @Description：		下载文件
	 * @param fileName		下载的文件名称
	 * @param targetFolder	FTP服务器目标文件夹
	 * @param file			下载的文件
	 * @throws FtpException	ftp异常
	 */
	public abstract void download(String fileName, String targetFolder, File file) throws FtpException;
	
}

