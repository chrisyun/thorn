package org.thorn.dao.mybatis.plugin;

import java.util.Properties;

import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Signature;

/**
 * <p>文件名称: SqlLoggingInterceptor.java</p>
 * <p>文件描述: 本类描述</p>
 * <p>版权所有: 版权所有(C)2010</p>
 * <p>内容摘要: 简要描述本文件的内容，包括主要模块、函数及能的说明</p>
 * <p>其他说明: 其它内容的说明</p>
 * <p>完成日期: 2012-4-27</p>
 * <p>修改记录1:</p>
 * <pre>
 *    修改日期:
 *    修 改 人:
 *    修改内容:
 * </pre>
 * <p>修改记录2：…</p>
 * @author  chenyun
 */
@Intercepts({@Signature(type= Executor.class,method = "update",
		args = {MappedStatement.class,Object.class})})
public class SqlLoggingInterceptor implements Interceptor {
	
	
	
	public Object intercept(Invocation invocation) throws Throwable {
		// TODO Auto-generated method stub
		return null;
	}

	public Object plugin(Object target) {
		// TODO Auto-generated method stub
		return null;
	}

	public void setProperties(Properties properties) {
		// TODO Auto-generated method stub

	}

}

