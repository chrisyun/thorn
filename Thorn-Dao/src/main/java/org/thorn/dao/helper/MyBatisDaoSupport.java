package org.thorn.dao.helper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.thorn.dao.core.Config;
import org.thorn.dao.core.Page;
import org.thorn.dao.exception.DBAccessException;
import org.thorn.dao.util.MapperUtils;

/**
 * @ClassName: MyBatisDaoSupport
 * @Description: TODO
 * @author chenyun
 * @date 2012-4-26 下午02:36:19
 */
public class MyBatisDaoSupport implements SimpleDaoSupport {

	static Logger log = LoggerFactory.getLogger(MyBatisDaoSupport.class);

	private SqlSessionTemplate sqlSessionTemplate;

	public SqlSessionTemplate getSqlSessionTemplate() {
		return sqlSessionTemplate;
	}

	public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		this.sqlSessionTemplate = sqlSessionTemplate;
	}

	public int saveOne(Object obj) throws DBAccessException {
		// TODO Auto-generated method stub
		String mapper = "";

		try {
			mapper = MapperUtils.getInsertMapper(obj.getClass());
			return sqlSessionTemplate.insert(mapper, obj);
		} catch (Exception e) {
			throw new DBAccessException(
					"MyBatisDaoSupport do save Exception, Object["
							+ obj.getClass().getName() + "],mapper[" + mapper
							+ "]", e);
		}
	}

	public int modifyOne(Object obj) throws DBAccessException {
		// TODO Auto-generated method stub
		String mapper = "";

		try {
			mapper = MapperUtils.getUpdateMapper(obj.getClass());
			return sqlSessionTemplate.update(mapper, obj);
		} catch (Exception e) {
			throw new DBAccessException(
					"MyBatisDaoSupport do modify Exception, Object["
							+ obj.getClass().getName() + "],mapper[" + mapper
							+ "]", e);
		}
	}

	public int deleteOne(Object obj) throws DBAccessException {
		// TODO Auto-generated method stub
		String mapper = "";

		try {
			mapper = MapperUtils.getDeleteMapper(obj.getClass());
			return sqlSessionTemplate.delete(mapper, obj);
		} catch (Exception e) {
			throw new DBAccessException(
					"MyBatisDaoSupport do delete Exception, Object["
							+ obj.getClass().getName() + "],mapper[" + mapper
							+ "]", e);
		}
	}

	public <T> T queryForOne(Object id, Class<T> bean) throws DBAccessException {
		// TODO Auto-generated method stub
		String mapper = "";

		try {
			mapper = MapperUtils.getQueryMapper(bean);
			return (T) sqlSessionTemplate.selectOne(mapper, id);
		} catch (Exception e) {
			throw new DBAccessException(
					"MyBatisDaoSupport do queryForOne Exception, Object["
							+ bean.getName() + "],mapper[" + mapper + "]", e);
		}
	}

	public <T> List<T> queryForList(Map<String, Object> filter, Class<T> bean)
			throws DBAccessException {
		// TODO Auto-generated method stub
		String mapper = "";

		try {
			mapper = MapperUtils.getQueryForListMapper(bean);
			return (List<T>) sqlSessionTemplate.selectList(mapper, filter);
		} catch (Exception e) {
			throw new DBAccessException(
					"MyBatisDaoSupport do queryForList Exception, Object["
							+ bean.getName() + "],mapper[" + mapper + "]", e);
		}
	}

	public <T> Page<T> queryForPage(Map<String, Object> filter, int start,
			int limit, Class<T> bean) throws DBAccessException {
		String pageMapper = "";
		String pageCountMapper = "";

		filter.put(Config.PAGE_START, start);
		filter.put(Config.PAGE_LIMIT, limit);

		try {
			pageMapper = MapperUtils.getQueryForPageCountMapper(bean);
			pageCountMapper = MapperUtils.getQueryForPageCountMapper(bean);

			Page<T> page = new Page<T>();

			page.setTotal((Long) sqlSessionTemplate.selectOne(pageCountMapper,
					filter));

			if (page.getTotal() > 0) {
				page.setReslutSet((List<T>) sqlSessionTemplate.selectList(
						pageMapper, filter));
			}

			filter.remove(Config.PAGE_START);
			filter.remove(Config.PAGE_LIMIT);

			return page;
		} catch (Exception e) {
			throw new DBAccessException(
					"MyBatisDaoSupport do queryForPage Exception, Object["
							+ bean.getName() + "],mapper[" + pageMapper
							+ "],countMapper[" + pageCountMapper + "]", e);
		}
	}

	public int deleteBatch(List<String> ids, Class bean)
			throws DBAccessException {
		String mapper = "";

		try {
			mapper = MapperUtils.getDeleteBatchMapper(bean);
			return sqlSessionTemplate.delete(mapper, ids);
		} catch (Exception e) {
			throw new DBAccessException(
					"MyBatisDaoSupport do deleteBatch Exception, Object["
							+ bean.getName() + "],mapper[" + mapper + "]", e);
		}
	}
	
}
