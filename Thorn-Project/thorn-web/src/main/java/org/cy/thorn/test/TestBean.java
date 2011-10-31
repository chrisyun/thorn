package org.cy.thorn.test;
/**
 * <p>文件名称: TestBean.java</p>
 * <p>文件描述: 本类描述</p>
 * <p>版权所有: 版权所有(C)2010</p>
 * <p>内容摘要: 简要描述本文件的内容，包括主要模块、函数及能的说明</p>
 * <p>其他说明: 其它内容的说明</p>
 * <p>完成日期: 2011-10-11</p>
 * <p>修改记录1:</p>
 * <pre>
 *    修改日期:
 *    修 改 人:
 *    修改内容:
 * </pre>
 * <p>修改记录2：…</p>
 * @author  chenyun
 */
public class TestBean {
	
	private String name;

	public String getName() {
		System.out.println("getName:"+name);
		return name;
	}

	public void setName(String name) {
		System.out.println("setName:"+name);
		this.name = name;
	}
	
	public void setMethod(String a) {
		System.out.println("setMethod:"+a);
	}
	
}

