package org.thorn.resource.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.thorn.dao.exception.DBAccessException;
import org.thorn.resource.entity.Resource;

/**
 * @ClassName: ResourceDaoImpl
 * @Description:
 * @author chenyun
 * @date 2012-5-6 上午10:24:53
 */
public class ResourceDaoImpl implements IResourceDao {

	static Logger log = LoggerFactory.getLogger(ResourceDaoImpl.class);

	private final static String nameSpace = "ResourceMapper.";

	@Autowired
	@Qualifier("sqlSessionTemplate")
	private SqlSessionTemplate sqlSessionTemplate;

	public List<Resource> queryByList(Map<String, Object> filter)
			throws DBAccessException {
		try {
			return (List<Resource>) sqlSessionTemplate.selectList(nameSpace
					+ "queryList", filter);
		} catch (Exception e) {
			throw new DBAccessException("ResourceDaoImpl", "queryList", e);
		}
	}

}
