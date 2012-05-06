package org.thorn.user.dao;

import java.util.Map;

import org.thorn.dao.exception.DBAccessException;
import org.thorn.user.entity.User;

/** 
 * @ClassName: IUserDao 
 * @Description: 
 * @author chenyun
 * @date 2012-5-6 上午11:15:37 
 */
public interface IUserDao {
	
	public User queryUser(Map<String, Object> filter) throws DBAccessException;
	
}

