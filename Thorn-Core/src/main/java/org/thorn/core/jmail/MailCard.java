package org.thorn.core.jmail;
/**
 * <p>文件名称: MailCard.java</p>
 * <p>文件描述: 邮件名片实体对象</p>
 * <p>版权所有: 版权所有(C)2010</p>
 * <p>内容摘要: 邮件接收人看到的为发送人名称而不是邮件地址</p>
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
public class MailCard {
	/** 邮箱地址 */
	private String eMail;
	
	/** 邮件名字 */
	private String name;
	
	public MailCard() {
		
	}
	
	public MailCard(String eMail, String name) {
		this.eMail = eMail;
		this.name = name;
	}
	
	public String geteMail() {
		return eMail;
	}

	public void seteMail(String eMail) {
		this.eMail = eMail;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}

