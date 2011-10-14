package org.cy.thorn.core.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>文件名称: Sorting.java</p>
 * <p>文件描述: 排序类</p>
 * <p>版权所有: 版权所有(C)2010</p>
 * <p>内容摘要: 简要描述本文件的内容，包括主要模块、函数及能的说明</p>
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
public class Sorting {
	
	private List<Sorter> mySort = new ArrayList<Sorter>();
	
	public List<Sorter> getMySort() {
		return mySort;
	}

	public void setMySort(List<Sorter> mySort) {
		this.mySort = mySort;
	}

	public String toString() {
		if(mySort != null && mySort.size() > 0) {
			StringBuffer sortbuff = new StringBuffer("order by ");
			
			for(Sorter sort : mySort) {
				sortbuff.append(sort.toString()).append(",");
			}
			return sortbuff.substring(0, sortbuff.length()-1);
		}
		
		return "";
	}
}

