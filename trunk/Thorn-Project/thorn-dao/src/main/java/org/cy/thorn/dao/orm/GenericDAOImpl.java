package org.cy.thorn.dao.orm;

import java.util.List;
import java.util.Map;

import org.cy.thorn.core.entity.Page;
import org.cy.thorn.core.entity.ResultPage;
import org.cy.thorn.core.entity.ResultSet;
import org.cy.thorn.core.entity.Sorting;
import org.cy.thorn.core.exceptions.DBAccessException;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.util.Assert;

/**
 * <p>文件名称: GenericDAOImpl.java</p>
 * <p>文件描述: 本类描述</p>
 * <p>版权所有: 版权所有(C)2010</p>
 * <p>内容摘要: 简要描述本文件的内容，包括主要模块、函数及能的说明</p>
 * <p>其他说明: 其它内容的说明</p>
 * <p>完成日期: 2011-9-29</p>
 * <p>修改记录1:</p>
 * <pre>
 *    修改日期:
 *    修 改 人:
 *    修改内容:
 * </pre>
 * <p>修改记录2：…</p>
 * @author  chenyun
 */
public class GenericDAOImpl implements IGenericDAO {
	
	private SqlSessionTemplate sqlSessionTemplate;
	
	public SqlSessionTemplate getSqlSessionTemplate() {
		return sqlSessionTemplate;
	}
	
	public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		this.sqlSessionTemplate = sqlSessionTemplate;
	}
	
	public void insert(String sqlStatement, Object[] objs)
			throws DBAccessException {
		Assert.notEmpty(objs, "the input is empty");
		
		try {
			for (Object obj : objs) {
				sqlSessionTemplate.insert(sqlStatement, obj);
			}
		} catch (Exception e) {
			String exceptMsg = "excute " + sqlStatement + 
				" to insert data exception, condition[" + objs + "]";
			throw new DBAccessException(exceptMsg,e);
		}
	}
	
	public void update(String sqlStatement, Object[] objs)
			throws DBAccessException {
		Assert.notEmpty(objs, "the input is empty");
		
		try {
			for (Object obj : objs) {
				sqlSessionTemplate.update(sqlStatement, obj);
			}
		} catch (Exception e) {
			String exceptMsg = "excute " + sqlStatement + 
				" to update data exception, condition[" + objs + "]";
			throw new DBAccessException(exceptMsg,e);
		}
	}
	
	public void delete(String sqlStatement, Object condition)
			throws DBAccessException {
		Assert.notNull(condition, "the input is null");
		try {
			sqlSessionTemplate.delete(sqlStatement, condition);
		} catch (Exception e) {
			String exceptMsg = "excute " + sqlStatement + 
				" to delete data exception, condition[" + condition + "]";
			throw new DBAccessException(exceptMsg,e);
		}
	}

	public Object searchObj(String sqlStatement, Object condition)
			throws DBAccessException {
		try {
			Object obj = sqlSessionTemplate.selectOne(sqlStatement, condition);
			return obj;
		} catch (Exception e) {
			String exceptMsg = "excute " + sqlStatement + 
				" to select one data exception, condition[" + condition + "]";
			throw new DBAccessException(exceptMsg,e);
		}
	}

	public <T> ResultSet<T> searchList(String sqlStatement, Map<String, Object> filter, Sorting sort)
			throws DBAccessException {
		ResultSet<T> rs = new ResultSet<T>();
		
		try {
			filter.put("sort", sort.getMySort());
			
			rs.setResult((List<T>) sqlSessionTemplate.selectList(sqlStatement, filter));
			rs.setCount(rs.getResult().size());
		} catch (Exception e) {
			String exceptMsg = "excute " + sqlStatement + 
				" to select list data exception, condition[" + rs.toString() + "]";
			throw new DBAccessException(exceptMsg,e);
		}
		
		return rs;
	}

	public <T> ResultPage<T> searchPage(String sqlStatement, Map<String, Object> filter, Sorting sort, Page page)
			throws DBAccessException {
		ResultPage<T> rp = new ResultPage<T>(page);
		
		try {
			rp.setCount(searchCount(sqlStatement+"-count", filter));
			
			filter.put("sort", sort.toString());
			filter.put("startRow", rp.indexRow());
			filter.put("endRow", rp.lastRow());
			
			rp.setResult((List<T>) sqlSessionTemplate.selectList(sqlStatement, filter));
		} catch (Exception e) {
			String exceptMsg = "excute " + sqlStatement + 
				" to select page data exception, condition[" + rp.toString() + "]";
			throw new DBAccessException(exceptMsg,e);
		}
		
		return rp;
	}

	public long searchCount(String sqlStatement, Object condition)
			throws DBAccessException {
		return (Long) this.searchObj(sqlStatement, condition);
	}

}

