package org.cy.thorn.core.entity;

import org.apache.commons.lang.StringUtils;
import org.springframework.util.Assert;

/**
 * <p>文件名称: ResultPage.java</p>
 * <p>文件描述: 后台分页对象，将结果返回给前台</p>
 * <p>版权所有: 版权所有(C)2010</p>
 * <p>内容摘要: 分页类主要用于
 * 				1、根据前台分页对象构造该对象，调用分页对象方法完成前台分页动作
 * 				2、根据分页对象完成数据库的分页查询，返回数据给前台页面
 * </p>
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
public class ResultPage<T> extends ResultSet<T> {
	
	/**
	 * 页大小，默认值为1
	 */
	private int pageSize = 1;
	
	/**
	 * 当前页，默认值为1即第一页
	 */
	private int pageNo = 1;
	
	/**
	 * 总页数
	 */
	private int sumPage = 1;
	
	public int getPageSize() {
		return pageSize;
	}


	public int getPageNo() {
		return pageNo;
	}


	public int getSumPage() {
		if(sumPage <= 1) {
			this.sumPage = (int)(this.count/this.pageSize);
			
			if((this.count % this.pageSize) > 0) {
				this.sumPage++;
			}
		}
		return sumPage;
	}


	public ResultPage(Page page) {
		Assert.isTrue( page.getPageSize() > 0, "pageSize is wrong");
		Assert.isTrue(page.getPageNo() > 0, "pageNo is wrong");
		
		this.pageSize = page.getPageSize();
		this.pageNo = page.getPageNo();
		
		if(StringUtils.equals(page.ACTION_CURRENT_PAGE, page.getDoAction())) {
			//doNothing
		} else if(StringUtils.equals(page.ACTION_PREVIOUS_PAGE, page.getDoAction())) {
			this.forwardPage(this.pageNo--);
		} else if(StringUtils.equals(page.ACTION_NEXT_PAGE, page.getDoAction())) {
			this.forwardPage(this.pageNo++);
		} else if(StringUtils.equals(page.ACTION_INDEX_PAGE, page.getDoAction())) {
			this.forwardPage(1);
		} else if(StringUtils.equals(page.ACTION_LAST_PAGE, page.getDoAction())) {
			this.forwardPage(getSumPage());
		} else if(StringUtils.equals(page.ACTION_FORWARD_PAGE, page.getDoAction())) {
			this.forwardPage(page.getSkipPage());
		}
		
	}
	
	/**
	 * 
	 * @author：chenyun 	        
	 * @date：2011-9-29
	 * @Description：
	 * @param goPage:跳转到指定的页面
	 */
	private void forwardPage(int forwardPage) {
		Assert.isTrue(isHasPage(forwardPage),"can't go to the page:" + forwardPage + toString());
		this.pageNo = forwardPage;
	}
	
	/**
	 * 
	 * @author：chenyun 	        
	 * @date：2011-9-29
	 * @Description：能否跳转到指定页
	 * @param goPage
	 * @return
	 */
	private boolean isHasPage(int forwardPage) {
		return (forwardPage > 0) && (forwardPage <= getSumPage());
	}
	
	/**
	 * 
	 * @author：chenyun 	        
	 * @date：2011-9-29
	 * @Description：获取当前页在所有结果集中的起始行
	 * @return
	 */
	public long indexRow() {
		return ((pageNo - 1) * pageSize) + 1;
	}
	
	/**
	 * 
	 * @author：chenyun 	        
	 * @date：2011-9-29
	 * @Description：获取当前页在所有结果集中的结束行
	 * @return
	 */
	public long lastRow() {
		long endRow = indexRow() + this.pageSize;
		
		if(endRow > this.count) {
			return this.count;
		}
		
		return endRow;
	}

	
	public String toString() {
		return String.format("ResultPage [pageSize=%s, pageNo=%s, count=%s, sumPage=%s]",
				this.pageSize, this.pageNo, this.count, this.sumPage);
	}
	
}

