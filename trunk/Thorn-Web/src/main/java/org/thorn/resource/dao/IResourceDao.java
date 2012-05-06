package org.thorn.resource.dao;

import java.util.List;
import java.util.Map;

import org.thorn.dao.exception.DBAccessException;
import org.thorn.resource.entity.Resource;

/** 
 * @ClassName: IResourceDao 
 * @Description: 
 * @author chenyun
 * @date 2012-5-6 上午10:22:39 
 */
public interface IResourceDao {
	
	public List<Resource> queryByList(Map<String, Object> filter) throws DBAccessException;
	
}

