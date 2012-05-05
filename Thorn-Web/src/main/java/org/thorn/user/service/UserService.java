package org.thorn.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.thorn.dao.exception.DBAccessException;
import org.thorn.dao.mybatis.helper.MyBatisDaoSupport;
import org.thorn.user.entity.User;

/** 
 * @ClassName: UserService 
 * @Description: 
 * @author chenyun
 * @date 2012-5-5 下午06:11:58 
 */
public class UserService implements IUserService {
	
	@Autowired
	@Qualifier("myBatisDaoSupport")
	private MyBatisDaoSupport daoSupport;
	
	public User queryUserByLogin(String idOrAccount) throws DBAccessException {
		// TODO Auto-generated method stub
		return null;
	}

}

