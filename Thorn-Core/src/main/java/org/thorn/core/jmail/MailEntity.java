package org.thorn.core.jmail;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>文件名称: MailEntity.java</p>
 * <p>文件描述: 邮件内容的实体对象</p>
 * <p>版权所有: 版权所有(C)2010</p>
 * <p>内容摘要: 简要描述本文件的内容，包括主要模块、函数及能的说明</p>
 * <p>其他说明: 其它内容的说明</p>
 * <p>完成日期: 2012-3-12</p>
 * <p>修改记录1:</p>
 * <pre>
 *    修改日期:
 *    修 改 人:
 *    修改内容:
 * </pre>
 * <p>修改记录2：…</p>
 * @author  chenyun
 */
public class MailEntity {
	private static final long serialVersionUID = 6190395311350810672L;

	/** 邮件主题 */
	private String subject;
	
	/** 邮件内容 */
	private String content;
	
	/** 接收人 */
	private List<MailCard> receiver = new ArrayList<MailCard>();
	
	/** 抄送人 */
	private List<MailCard> copyer = new ArrayList<MailCard>();
	
	/** 附件地址 */
	private List<String> attAddress = new ArrayList<String>();;

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public List<MailCard> getReceiver() {
		return receiver;
	}

	public void setReceiver(List<MailCard> receiver) {
		this.receiver = receiver;
	}

	public List<MailCard> getCopyer() {
		return copyer;
	}

	public void setCopyer(List<MailCard> copyer) {
		this.copyer = copyer;
	}

	public List<String> getAttAddress() {
		return attAddress;
	}

	public void setAttAddress(List<String> attAddress) {
		this.attAddress = attAddress;
	}
}

