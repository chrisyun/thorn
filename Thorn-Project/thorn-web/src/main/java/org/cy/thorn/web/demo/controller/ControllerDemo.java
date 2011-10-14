package org.cy.thorn.web.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.cy.thorn.dao.orm.IGenericDAO;
import org.cy.thorn.core.entity.JSONPageRequest;
import org.cy.thorn.core.entity.JSONRespond;
import org.cy.thorn.core.entity.Page;
import org.cy.thorn.core.entity.ResultPage;
import org.cy.thorn.core.entity.Sorter;
import org.cy.thorn.core.entity.Sorting;
import org.cy.thorn.core.entity.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * <p>文件名称: ControllerDemo.java</p>
 * <p>文件描述: 简单的DEMO示例</p>
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
@Scope("prototype")
@Controller
public class ControllerDemo {
	
	static Log log = LogFactory.getLog(ControllerDemo.class);
	
	@Autowired
	@Qualifier("genericDao")
	private IGenericDAO genericDao;

	@RequestMapping("/demo/pageSearch")
	@ResponseBody
	public JSONRespond<Demo> pageSearch(@RequestBody JSONPageRequest jsonRequest) {
		
		JSONRespond<Demo> jr = new JSONRespond<Demo>();
		
		log.info(jsonRequest.getSorting().toString());
		log.info(jsonRequest.getPage().toString());
		
		try {
			ResultPage<Demo> rp = genericDao.searchPage("DemoMapper.pageSearch", jsonRequest.getFilter(), jsonRequest.getSorting(), jsonRequest.getPage());
			jr.setResultSet(rp);
		} catch (Exception e) {
			jr.getStatus().setCode(Status.FAILURE);
			jr.getStatus().setMessage(e.getMessage());
			log.error("demo controller ", e);
		}
		
		return jr;
	}
	@RequestMapping("/demo/insert")
	@ResponseBody
	public JSONRespond<String> insert() {
		
		JSONRespond<String> jr = new JSONRespond<String>();
		
		try {
			
			Demo d1 = new Demo();
			d1.setName("d1");
			d1.setNum(20);
			
			Demo d2 = new Demo();
			d2.setName("d1");
			d2.setNum(20);
			
			genericDao.insert("DemoMapper.insert", new Demo[]{d1,d2});
			
		} catch (Exception e) {
			jr.getStatus().setCode(Status.FAILURE);
			jr.getStatus().setMessage(e.getMessage());
			log.error("demo controller ", e);
		}
		
		return jr;
	}
	
	@RequestMapping("/demo/testReq")
	@ResponseBody
	public JSONPageRequest testRequest() {
		Map map = new HashMap<String, Object>();
		map.put("mao", 123);
		map.put("mao1", 1234);
		
		List<Sorter> ls = new ArrayList<Sorter>();
		Sorter sr1 = new Sorter();
		sr1.setSortName("a");
		sr1.setOrder(Sorter.DESC);
		ls.add(sr1);
		Sorter sr2 = new Sorter();
		sr2.setSortName("a");
		sr2.setOrder(Sorter.DESC);
		ls.add(sr2);
		
		Sorting si = new Sorting();
		si.setMySort(ls);
		
		Page p = new Page();
		p.setPageNo(1);
		p.setPageSize(20);
		p.setDoAction(Page.ACTION_CURRENT_PAGE);
		p.setSkipPage(0);
		
		JSONPageRequest jr = new JSONPageRequest();
		jr.setFilter(map);
		jr.setPage(p);
		jr.setSorting(si);
		
		return jr;
	}
	
	
	
}

