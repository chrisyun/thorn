package org.thorn.resource.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.thorn.dao.core.Configuration;
import org.thorn.dao.exception.DBAccessException;
import org.thorn.resource.dao.IResourceDao;
import org.thorn.resource.entity.Resource;

/**
 * 
 * @ClassName: ResourceService 
 * @Description: 
 * @author chenyun
 * @date 2012-5-5 下午06:08:54 
 *
 */
public class ResourceServiceImpl implements IResourceService {
	
	static Logger log = LoggerFactory.getLogger(ResourceServiceImpl.class);
	
	@Autowired
	@Qualifier("resourceDao")
	private IResourceDao resourceDao;
	
	public List<Resource> queryAllResource() throws DBAccessException {
		Map<String, Object> filter = new HashMap<String, Object>();
		
		// 根节点不展示，根节点无URL
		filter.put("isleaf", Configuration.DB_YES);
		
		return resourceDao.queryByList(filter);
	}

	public List<Resource> queryLeftTree(String pid) throws DBAccessException {
		
		Map<String, Object> filter = new HashMap<String, Object>();
		filter.put("parentSource", pid);
		filter.put("isShow", Configuration.DB_YES);
		filter.put(Configuration.SROT_NAME, "SORTNUM");
		filter.put(Configuration.ORDER_NAME, Configuration.ORDER_ASC);
		
		return resourceDao.queryByList(filter);
	}

}

