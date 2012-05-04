package org.thorn.user.service;

import org.thorn.dao.exception.DBAccessException;
import org.thorn.user.entity.User;

/** 
 * @ClassName: IUserService 
 * @Description: 
 * @author chenyun
 * @date 2012-5-4 下午03:02:29 
 */
public interface IUserService {
	
	public User queryUserByLogin(String idOrAccount) throws DBAccessException;
	
}

