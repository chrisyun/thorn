package org.thorn.role.service;

import java.util.List;

import org.thorn.dao.exception.DBAccessException;
import org.thorn.role.entity.Role;

/** 
 * @ClassName: IRoleService 
 * @Description: 
 * @author chenyun
 * @date 2012-5-4 下午03:17:35 
 */
public interface IRoleService {
	
	public List<Role> queryRolesByUser(String userId) throws DBAccessException;
	
	/**
	 * 
	 * @Description：根据权限ID列表查找对应的角色，返回的角色列表需要去重
	 * @author：chenyun 	        
	 * @date：2012-5-4 下午03:48:01
	 * @param source
	 * @return
	 * @throws DBAccessException
	 */
	public List<Role> queryRolesByResource(List<String> source) throws DBAccessException;
	
}
