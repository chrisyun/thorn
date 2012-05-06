package org.thorn.user.dao;

import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.thorn.dao.exception.DBAccessException;
import org.thorn.role.dao.RoleDaoImpl;
import org.thorn.user.entity.User;

/**
 * @ClassName: UserDaoImpl
 * @Description:
 * @author chenyun
 * @date 2012-5-6 上午11:15:55
 */
public class UserDaoImpl implements IUserDao {

	static Logger log = LoggerFactory.getLogger(UserDaoImpl.class);

	private final static String nameSpace = "UserMapper";

	@Autowired
	@Qualifier("sqlSessionTemplate")
	private SqlSessionTemplate sqlSessionTemplate;

	public User queryUser(Map<String, Object> filter) throws DBAccessException {
		try {
			return (User) sqlSessionTemplate.selectOne(nameSpace + "queryList",
					filter);
		} catch (Exception e) {
			throw new DBAccessException("UserDaoImpl do queryUser Exception", e);
		}
	}

}
