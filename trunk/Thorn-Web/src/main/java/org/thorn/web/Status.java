package org.thorn.web;

import java.io.Serializable;

/** 
 * @ClassName: Status 
 * @Description: 
 * @author chenyun
 * @date 2012-5-6 下午08:08:52 
 */
public class Status implements Serializable {
	
	public static final String SUCCESS = "success";
	
	public static final String FAILURE = "failure";
	
	/** */
	private static final long serialVersionUID = 1902952901629816953L;
	
	private String flag = SUCCESS;
	
	private String msg;

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
}

