package org.cy.thorn.dd.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.cy.thorn.core.entity.Page;
import org.cy.thorn.core.entity.ResultPage;
import org.cy.thorn.core.entity.ResultSet;
import org.cy.thorn.core.entity.Sorting;
import org.cy.thorn.core.exceptions.DBAccessException;
import org.cy.thorn.core.util.CacheUtil;
import org.cy.thorn.dd.entity.Dict;
import org.cy.thorn.dd.entity.DictType;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.util.Assert;

/**
 * <p>文件名称: DataDictDAOImpl.java</p>
 * <p>文件描述: 数据字典的数据库操作</p>
 * <p>版权所有: 版权所有(C)2010</p>
 * <p>内容摘要: 简要描述本文件的内容，包括主要模块、函数及能的说明</p>
 * <p>其他说明: 其它内容的说明</p>
 * <p>完成日期: 2011-10-18</p>
 * <p>修改记录1:</p>
 * <pre>
 *    修改日期:
 *    修 改 人:
 *    修改内容:
 * </pre>
 * <p>修改记录2：…</p>
 * @author  chenyun
 */
public class DataDictDAOImpl implements IDataDictDAO {
	
	static Log log = LogFactory.getLog(DataDictDAOImpl.class);
	
	private static final String DICTTYPE_SUFFIX = ".dictType";
	
	private static final String DICT_SUFFIX = ".dict";
	
	private static final String DICT_LIST_SUFFIX = ".dictList";
	
	private SqlSessionTemplate sqlSessionTemplate;
	
	public SqlSessionTemplate getSqlSessionTemplate() {
		return sqlSessionTemplate;
	}

	public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		this.sqlSessionTemplate = sqlSessionTemplate;
	}
	
	public void deleteByTypeId(List<String> ids) throws DBAccessException {
		Assert.notEmpty(ids,"the list is empty");
		
		try {
			sqlSessionTemplate.delete("DictTypeMapper.deleteByPKs", ids);
			sqlSessionTemplate.delete("DictMapper.deleteByTypeIds", ids);
		} catch (Exception e) {
			String exceptMsg = "excute to delete dictType and dict data exception";
			throw new DBAccessException(exceptMsg,e);
		}
		
		for(String id : ids) {
			CacheUtil.deleteObject(id + DICTTYPE_SUFFIX);
			CacheUtil.deleteObject(id + DICT_LIST_SUFFIX);
		}
	}

	public void deleteDt(List<String> ids) throws DBAccessException {
		Assert.notEmpty(ids,"the list is empty");
		
		try {
			sqlSessionTemplate.delete("DictMapper.deleteByPKs", ids);
		} catch (Exception e) {
			String exceptMsg = "excute to delete dict data exception";
			throw new DBAccessException(exceptMsg,e);
		}
		
		for(String id : ids) {
			CacheUtil.deleteObject(id + DICT_SUFFIX);
		}
	}

	public void insertDt(Dict dict) throws DBAccessException {
		Assert.notNull(dict,"the dict is null");
		
		try {
			sqlSessionTemplate.insert("DictMapper.insert", dict);
			CacheUtil.updateObject(dict.getDname() + DICT_SUFFIX, dict);
		} catch (Exception e) {
			String exceptMsg = "excute to insert dict data exception,dict:"+dict.toString();
			throw new DBAccessException(exceptMsg,e);
		}
	}

	public void insertDtType(DictType dictType) throws DBAccessException {
		Assert.notNull(dictType,"the dictType is null");
		
		try {
			sqlSessionTemplate.insert("DictTypeMapper.insert", dictType);
			CacheUtil.updateObject(dictType.getEname() + DICTTYPE_SUFFIX, dictType);
		} catch (Exception e) {
			String exceptMsg = "excute to insert dictType data exception,dictType:"+dictType.toString();
			throw new DBAccessException(exceptMsg,e);
		}
	}

	public Dict searchByPk(String dname) throws DBAccessException {
		Assert.hasText(dname,"the dname is null");
		
		Dict dict = (Dict) CacheUtil.getObject(dname + DICT_SUFFIX);
		
		if(dict != null) {
			return dict;
		}
		
		try {
			dict = (Dict) sqlSessionTemplate.selectOne("DictMapper.selectByPK", dname);
			CacheUtil.updateObject(dname + DICT_SUFFIX, dict);
		} catch (Exception e) {
			String exceptMsg = "select dict data by pk exception,pk:"+dname;
			throw new DBAccessException(exceptMsg,e);
		}
		
		return dict;
	}

	public ResultSet<Dict> searchDt(String typeId) throws DBAccessException {
		Assert.hasText(typeId,"the typeId is null");
		
		ResultSet<Dict> rs = new ResultSet<Dict>();
		
		List<Dict> list = (List<Dict>) CacheUtil.getObject(typeId + DICT_LIST_SUFFIX);
		
		if(list != null && list.size() > 0) {
			rs.setResult(list);
			rs.setCount(list.size());
			return rs;
		}
		
		
		try {
			HashMap<String, String> filter = new HashMap<String, String>();
			filter.put("typeId", typeId);
			list = (List<Dict>) sqlSessionTemplate.selectList("DictMapper.select", filter);
			
			rs.setResult(list);
			rs.setCount(list.size());
			CacheUtil.updateObject(typeId + DICT_LIST_SUFFIX, list);
		} catch (Exception e) {
			String exceptMsg = "select dict data by typeId exception,typeId:"+typeId;
			throw new DBAccessException(exceptMsg,e);
		}
		
		return rs;
	}

	public DictType searchDtTypeByPK(String ename) throws DBAccessException {
		Assert.hasText(ename,"the ename is null");
		
		DictType dtType = (DictType) CacheUtil.getObject(ename + DICTTYPE_SUFFIX);
		
		if(dtType != null) {
			return dtType;
		}
		
		try {
			dtType = (DictType) sqlSessionTemplate.selectOne("DictTypeMapper.selectByPK", ename);
			CacheUtil.updateObject(ename + DICT_SUFFIX, dtType);
		} catch (Exception e) {
			String exceptMsg = "select dictType data by pk exception,pk:"+ename;
			throw new DBAccessException(exceptMsg,e);
		}
		
		return dtType;
	}

	public ResultPage<DictType> searchDtTypeByPage(Map<String, Object> filter,
			Sorting sort, Page page) throws DBAccessException {
		ResultPage<DictType> rp = new ResultPage<DictType>(page);
		
		try {
			rp.setCount((Long)sqlSessionTemplate.selectOne("DictTypeMapper.selectCount", filter));
			
			filter.put("sort", sort.toString());
			filter.put("startRow", rp.indexRow());
			filter.put("endRow", rp.lastRow());
			
			List<DictType> list = (List<DictType>) sqlSessionTemplate.selectList("DictTypeMapper.selectByPage", filter);
			rp.setResult(list);
		} catch (Exception e) {
			String exceptMsg = "select dtType page data exception, condition[" + rp.toString() + "]";
			throw new DBAccessException(exceptMsg,e);
		}
		
		return rp;
	}

	public void updateDt(Dict dict) throws DBAccessException {
		Assert.notNull(dict,"the dict is null");
		
		try {
			sqlSessionTemplate.update("DictMapper.update", dict);
			CacheUtil.updateObject(dict.getDname() + DICT_SUFFIX, dict);
		} catch (Exception e) {
			String exceptMsg = "excute to update dict data exception,dict:"+dict.toString();
			throw new DBAccessException(exceptMsg,e);
		}
	}

	public void updateDtType(DictType dictType) throws DBAccessException {
		Assert.notNull(dictType,"the dictType is null");
		
		try {
			sqlSessionTemplate.update("DictTypeMapper.update", dictType);
			CacheUtil.updateObject(dictType.getEname() + DICTTYPE_SUFFIX, dictType);
		} catch (Exception e) {
			String exceptMsg = "excute to update dictType data exception,dictType:"+dictType.toString();
			throw new DBAccessException(exceptMsg,e);
		}
	}
	
}

