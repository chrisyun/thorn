package org.thorn.dao.helper;

import java.util.List;
import java.util.Map;

import org.thorn.dao.core.Page;
import org.thorn.dao.exception.DBAccessException;

/** 
 * @ClassName: SimpleDaoSupport 
 * @Description: 定义简单DAO操作方法，只能进行简单的单对象的处理
 * @author chenyun
 * @date 2012-4-26 下午01:33:46 
 */
public interface SimpleDaoSupport {
	
	public int saveOne(Object obj) throws DBAccessException;
	
	public int modifyOne(Object obj) throws DBAccessException;
	
	public int deleteOne(Object obj) throws DBAccessException;
	
	public <T> T queryForOne(Object id, Class<T> bean) throws DBAccessException;
	
	public <T> List<T> queryForList(Map<String, Object> filter, Class<T> bean) throws DBAccessException;
	
	public <T> Page<T> queryForPage(Map<String, Object> filter, int start, int limit, Class<T> bean) throws DBAccessException;
	
	public int deleteBatch(List<String> ids, Class bean) throws DBAccessException;
}

