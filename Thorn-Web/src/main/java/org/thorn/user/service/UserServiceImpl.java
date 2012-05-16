package org.thorn.user.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.thorn.core.util.LocalStringUtils;
import org.thorn.dao.core.Configuration;
import org.thorn.dao.core.Page;
import org.thorn.dao.exception.DBAccessException;
import org.thorn.security.SecurityEncoderUtils;
import org.thorn.user.dao.IUserDao;
import org.thorn.user.entity.User;

/** 
 * @ClassName: UserServiceImpl 
 * @Description: 
 * @author chenyun
 * @date 2012-5-6 下午12:01:15 
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

	public void save(User user) throws DBAccessException {
		userDao.save(user);
	}

	public void modify(User user) throws DBAccessException {
		userDao.modify(user);
	}

	public void delete(String ids) throws DBAccessException {
		List<String> list = LocalStringUtils.splitStr2Array(ids);
		userDao.delete(list);
	}

	public Page<User> queryPage(String orgCode, String userName, String cumail,
			String userAccount, long start, long limit, String sort, String dir)
			throws DBAccessException {
		Map<String, Object> filter = new HashMap<String, Object>();
		
		filter.put("idOrAccount", userAccount);
		filter.put("cumail", cumail);
		filter.put("orgCode", orgCode);
		filter.put("userName", userName);
		
		filter.put(Configuration.PAGE_LIMIT, limit);
		filter.put(Configuration.PAGE_START, start);

		if(LocalStringUtils.isEmpty(sort)) {
			filter.put(Configuration.SROT_NAME, "SORTNUM");
			filter.put(Configuration.ORDER_NAME, Configuration.ORDER_ASC);
		} else {
			filter.put(Configuration.SROT_NAME, sort);
			filter.put(Configuration.ORDER_NAME, dir);
		}
		
		return userDao.queryPage(filter);
	}

	public void disabledUser(String ids, String isDisabled)
			throws DBAccessException {
		Map<String, Object> filter = new HashMap<String, Object>();
		
		List<String> list = LocalStringUtils.splitStr2Array(ids);
		filter.put("list", list);
		filter.put("isDisabled", isDisabled);
		
		userDao.disabled(filter);
	}

	public void changePwd(String userId, String newPwd)
			throws DBAccessException {
		User user = new User();
		user.setUserId(userId);
		user.setUserPwd(SecurityEncoderUtils.encodeUserPassword(newPwd, userId));
		
		userDao.modify(user);
	}

}
