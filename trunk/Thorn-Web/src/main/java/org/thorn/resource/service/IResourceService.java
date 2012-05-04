package org.thorn.resource.service;

import java.util.List;

import org.thorn.dao.exception.DBAccessException;
import org.thorn.resource.entity.Resource;

/** 
 * @ClassName: IResourceService 
 * @Description: 
 * @author chenyun
 * @date 2012-5-4 下午03:35:41 
 */
public interface IResourceService {
	
	public List<Resource> queryResourceByRole(String roleId) throws DBAccessException;
	
	public List<Resource> queryAllResource() throws DBAccessException;
	
}

