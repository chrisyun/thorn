package org.cy.thorn.core.entity;
/**
 * <p>文件名称: JSONRespond.java</p>
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
public class JSONRespond<T> {
	
	private Status status = new Status();
	
	private ResultSet<T> resultSet;

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public ResultSet<T> getResultSet() {
		return resultSet;
	}

	public void setResultSet(ResultSet<T> resultSet) {
		this.resultSet = resultSet;
	}

	
}

