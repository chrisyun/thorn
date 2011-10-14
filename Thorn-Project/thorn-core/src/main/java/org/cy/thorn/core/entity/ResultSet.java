package org.cy.thorn.core.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>文件名称: ResultSet.java</p>
 * <p>文件描述: 结果集对象</p>
 * <p>版权所有: 版权所有(C)2010</p>
 * <p>内容摘要: 该类不支持分页，简单的结果集对象</p>
 * <p>其他说明: 其它内容的说明</p>
 * <p>完成日期: 2011-9-28</p>
 * <p>修改记录1:</p>
 * <pre>
 *    修改日期:
 *    修 改 人:
 *    修改内容:
 * </pre>
 * <p>修改记录2：…</p>
 * @author  chenyun
 */
public class ResultSet<T> {
	
	/**
	 * 结果集
	 */
	protected List<T> result = new ArrayList<T>();
	
	/**
	 * 全部结果集大小
	 */
	protected long count = 0;
	
	public ResultSet() {
		
	}
	
	public ResultSet(List<T> result) {
		if(result != null) {
			this.result = result;
			this.count = result.size();
		}
	}

	public List<T> getResult() {
		return result;
	}

	public void setResult(List<T> result) {
		this.result = result;
	}

	public long getCount() {
		return count;
	}

	public void setCount(long count) {
		this.count = count;
	}
	
	public String toString() {
		return String.format("ResultPage [result=%s, count=%s]",
				this.result, this.count);
	}
	
}

