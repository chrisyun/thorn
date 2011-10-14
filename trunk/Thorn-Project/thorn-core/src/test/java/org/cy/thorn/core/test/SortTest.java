package org.cy.thorn.core.test;

import java.util.ArrayList;
import java.util.List;

import org.cy.thorn.core.entity.Sorter;
import org.cy.thorn.core.entity.Sorting;

import junit.framework.TestCase;

/**
 * <p>文件名称: SortTest.java</p>
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
public class SortTest extends TestCase {
	
	public void testSort() {
		List<Sorter> sl = new ArrayList<Sorter>();
		
		Sorting soi = new Sorting();
		
		Sorter ser1 = new Sorter();
		ser1.setSortName("a");
		ser1.setOrder(Sorter.ASC);
		
		Sorter ser2 = new Sorter();
		ser2.setSortName("b");
		ser2.setOrder(Sorter.DESC);
		
		sl.add(ser1);
		sl.add(ser2);
		soi.setMySort(sl);
		
		System.out.println(soi.toString());
	}
}

