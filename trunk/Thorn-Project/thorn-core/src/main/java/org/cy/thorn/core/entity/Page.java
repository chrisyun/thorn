package org.cy.thorn.core.entity;
/**
 * <p>文件名称: Page.java</p>
 * <p>文件描述: 前台分页使用的分页对象，传给后台使用</p>
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
public class Page {
	
	/**
	 * 当前页
	 */
	public final static String ACTION_CURRENT_PAGE = "current.page"; 
	
	/**
	 * 上一页
	 */
	public final static String ACTION_PREVIOUS_PAGE = "previous.page"; 
	
	/**
	 * 下一页
	 */
	public final static String ACTION_NEXT_PAGE = "next.page"; 
	
	/**
	 * 首页
	 */
	public final static String ACTION_INDEX_PAGE = "index.page"; 
	
	/**
	 * 尾页
	 */
	public final static String ACTION_LAST_PAGE = "last.page"; 
	
	/**
	 * 跳转
	 */
	public final static String ACTION_FORWARD_PAGE = "forward.page"; 
	
	/**
	 * 页大小，默认值为1
	 */
	private int pageSize = 1;
	
	/**
	 * 当前页，默认值为1即第一页
	 */
	private int pageNo = 1;
	
	/**
	 * 执行的动作
	 */
	private String doAction = ACTION_CURRENT_PAGE;
	
	/**
	 * 跳转的页数
	 */
	private int skipPage = 0;

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public String getDoAction() {
		return doAction;
	}

	public void setDoAction(String doAction) {
		this.doAction = doAction;
	}

	public int getSkipPage() {
		return skipPage;
	}

	public void setSkipPage(int skipPage) {
		this.skipPage = skipPage;
	}
	
	public String toString() {
		return String.format("Page [pageSize=%s, pageNo=%s, doAction=%s, skipPage=%s]", 
				pageSize, pageNo, doAction, skipPage);
	}
	
}

