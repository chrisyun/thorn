package org.thorn.dao.core.annotation;
/** 
 * @ClassName: ColumnEntity 
 * @Description: TODO
 * @author chenyun
 * @date 2012-4-26 下午03:42:14 
 */
public class ColumnEntity {
	
	private String name;
	
	private Column column;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Column getColumn() {
		return column;
	}

	public void setColumn(Column column) {
		this.column = column;
	}
}

