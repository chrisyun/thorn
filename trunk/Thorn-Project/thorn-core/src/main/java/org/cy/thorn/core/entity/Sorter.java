package org.cy.thorn.core.entity;

import org.apache.commons.lang.StringUtils;

/**
 * <p>文件名称: Sorter.java</p>
 * <p>文件描述: 单个排序对象</p>
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
public class Sorter {

	public static final String ASC = "asc";
	public static final String DESC = "desc";
	
	private String sortName;
	
	private String order;

	public String getSortName() {
		return sortName;
	}

	public void setSortName(String sortName) {
		this.sortName = sortName;
	}

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}
	
	public String toString() {
		if(StringUtils.isNotEmpty(sortName) 
				&& StringUtils.isNotEmpty(order) ) {
			return sortName + " " + order;
		}
		
		return "";
	}
}

