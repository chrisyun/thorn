package org.thorn.role.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.thorn.dao.exception.DBAccessException;
import org.thorn.dao.mybatis.helper.MyBatisDaoSupport;
import org.thorn.role.entity.Role;

/** 
 * @ClassName: RoleService 
 * @Description: 
 * @author chenyun
 * @date 2012-5-5 下午06:11:17 
 */
public class RoleService implements IRoleService {
	
	@Autowired
	@Qualifier("myBatisDaoSupport")
	private MyBatisDaoSupport daoSupport;
	
	public List<Role> queryRolesByResource(List<String> source)
			throws DBAccessException {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Role> queryRolesByUser(String userId) throws DBAccessException {
		// TODO Auto-generated method stub
		return null;
	}

}

