package org.thorn.role.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.thorn.dao.exception.DBAccessException;
import org.thorn.role.entity.Role;

/**
 * @ClassName: RoleDaoImpl
 * @Description:
 * @author chenyun
 * @date 2012-5-6 上午10:51:05
 */
public class RoleDaoImpl implements IRoleDao {
	static Logger log = LoggerFactory.getLogger(RoleDaoImpl.class);

	private final static String nameSpace = "RoleMapper";

	@Autowired
	@Qualifier("sqlSessionTemplate")
	private SqlSessionTemplate sqlSessionTemplate;

	public List<Role> queryRolesByUser(String userId) throws DBAccessException {
		try {
			return (List<Role>) sqlSessionTemplate.selectList(nameSpace
					+ "queryByUser", userId);
		} catch (Exception e) {
			throw new DBAccessException(
					"RoleDaoImpl do queryByUser Exception",e);
		}
	}

	public List<Role> queryRolesByResource(List<String> source)
			throws DBAccessException {
		try {
			return (List<Role>) sqlSessionTemplate.selectList(nameSpace
					+ "queryBySource", source);
		} catch (Exception e) {
			throw new DBAccessException(
					"RoleDaoImpl do queryRolesByResource Exception", e);
		}
	}

}
