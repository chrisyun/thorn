package org.thorn.resource.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.thorn.dao.exception.DBAccessException;
import org.thorn.dao.mybatis.helper.MyBatisDaoSupport;
import org.thorn.resource.entity.Resource;

/**
 * 
 * @ClassName: ResourceService 
 * @Description: 
 * @author chenyun
 * @date 2012-5-5 下午06:08:54 
 *
 */
public class ResourceService implements IResourceService {
	
	@Autowired
	@Qualifier("myBatisDaoSupport")
	private MyBatisDaoSupport daoSupport;
	
	public List<Resource> queryAllResource() throws DBAccessException {
		// TODO Auto-generated method stub
		return new ArrayList<Resource>();
	}

	public List<Resource> queryResourceByRole(String roleId)
			throws DBAccessException {
		// TODO Auto-generated method stub
		return new ArrayList<Resource>();
	}

}

