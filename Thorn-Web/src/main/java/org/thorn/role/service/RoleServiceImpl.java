package org.thorn.role.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.thorn.dao.exception.DBAccessException;
import org.thorn.dao.mybatis.helper.MyBatisDaoSupport;
import org.thorn.role.dao.IRoleDao;
import org.thorn.role.entity.Role;

/** 
 * @ClassName: RoleServiceImpl 
 * @Description: 
 * @author chenyun
 * @date 2012-5-5 下午06:11:17 
 */
public class RoleServiceImpl implements IRoleService {
	
	@Autowired
	@Qualifier("roleDao")
	private IRoleDao roleDao;
	
	public List<Role> queryRolesByResource(List<String> source)
			throws DBAccessException {
		return roleDao.queryRolesByResource(source);
	}

	public List<Role> queryRolesByUser(String userId) throws DBAccessException {
		return roleDao.queryRolesByUser(userId);
	}

}

