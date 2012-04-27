package org.thorn.dao.plugin;

import java.util.Properties;

import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;

/** 
 * @ClassName: ExamplePlugin 
 * @Description: TODO
 * @author chenyun
 * @date 2012-4-27 下午01:48:30 
 */
@Intercepts({@Signature(type= Executor.class,method = "update",
		args = {MappedStatement.class,Object.class})})
public class ExamplePlugin implements Interceptor {

	public Object intercept(Invocation invocation) throws Throwable {
		// TODO Auto-generated method stub
		return null;
	}

	public Object plugin(Object target) {
		// TODO Auto-generated method stub
		return Plugin.wrap(target, this);
	}

	public void setProperties(Properties properties) {
		System.out.println(properties.get("someProperty"));

	}

}

