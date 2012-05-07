package org.thorn.role.dao;

import java.util.List;

import org.thorn.dao.exception.DBAccessException;
import org.thorn.role.entity.Role;

/**
 * @ClassName: IRoleDao
 * @Description:
 * @author chenyun
 * @date 2012-5-6 上午10:48:02
 */
public interface IRoleDao {
	
	/**
	 * 
	 * @Description：
	 * @author：chenyun 	        
	 * @date：2012-5-6 上午11:14:15
	 * @param userId
	 * @return
	 * @throws DBAccessException
	 */
	public List<Role> queryRolesByUser(String userId) throws DBAccessException;

	public List<Role> queryRolesByResource(List<String> source)
			throws DBAccessException;
}
