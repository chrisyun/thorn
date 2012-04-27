package org.thorn.dao.type;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;

/** 
 * @ClassName: MyTypeHandler 
 * @Description: TODO简单的mybatis类型转换器，字符串的转换
 * @author chenyun
 * @date 2012-4-27 上午11:40:56 
 */
public class MyTypeHandler implements TypeHandler {

	public void setParameter(PreparedStatement ps, int i, Object parameter,
			JdbcType jdbcType) throws SQLException {
		ps.setString(i, (String) parameter);

	}

	public Object getResult(ResultSet rs, String columnName)
			throws SQLException {
		// TODO Auto-generated method stub
		return rs.getString(columnName);
	}

	public Object getResult(CallableStatement cs, int columnIndex)
			throws SQLException {
		return cs.getString(columnIndex);
	}

}
