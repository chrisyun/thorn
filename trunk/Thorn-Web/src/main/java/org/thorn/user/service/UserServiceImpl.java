package org.thorn.user.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.thorn.dao.exception.DBAccessException;
import org.thorn.user.dao.IUserDao;
import org.thorn.user.entity.User;

/** 
 * @ClassName: UserService 
 * @Description: 
 * @author chenyun
 * @date 2012-5-5 下午06:11:58 
 */
public class UserServiceImpl implements IUserService {
	
	@Autowired
	@Qualifier("userDao")
	private IUserDao userDao;
	
	public User queryUserByLogin(String idOrAccount) throws DBAccessException {
		
		Map<String, Object> filter = new HashMap<String, Object>();
		filter.put("idOrAccount", idOrAccount);
		
		return userDao.queryUser(filter);
	}

}
