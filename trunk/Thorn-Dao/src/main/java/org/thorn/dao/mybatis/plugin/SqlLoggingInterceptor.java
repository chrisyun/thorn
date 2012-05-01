package org.thorn.dao.mybatis.plugin;

import java.sql.Statement;
import java.util.List;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
@Intercepts({@Signature(type= StatementHandler.class,method = "update",
		args = {Statement.class,Object.class})})
public class SqlLoggingInterceptor implements Interceptor {
	
	static Logger log = LoggerFactory.getLogger(SqlLoggingInterceptor.class);
	
	private List<SqlLoggingHandler> handlers;
	
	private String filter;
	
	public Object intercept(Invocation invocation) throws Throwable {
		// TODO Auto-generated method stub
		StatementHandler statementHandler = (StatementHandler)invocation.getTarget();
		
		BoundSql boundSql = statementHandler.getBoundSql();
		
		//可执行sql
		String preparedSql = boundSql.getSql();
		log.debug("the boundSql:{}",preparedSql);
		
		//根据过滤器判定是否需要执行handler
		if(StringUtils.isNotEmpty(filter)) {
			
			Pattern pattern = Pattern.compile(filter);
			Matcher m = pattern.matcher(preparedSql);
			
			if(! m.matches()) {
				return null;
			}
		}
		
		String logSql = "";
		log.debug("the logsql:{}",logSql);
		
		for(SqlLoggingHandler handler : handlers) {
			handler.dispose(logSql);
		}
		
		return null;
	}

	public Object plugin(Object target) {
		// TODO Auto-generated method stub
		return Plugin.wrap(target, this);
	}

	public void setProperties(Properties properties) {
		// TODO Auto-generated method stub
		this.filter = properties.getProperty("filter");
	}

	public List<SqlLoggingHandler> getHandlers() {
		return handlers;
	}

	public void setHandlers(List<SqlLoggingHandler> handlers) {
		this.handlers = handlers;
	}
	
}

