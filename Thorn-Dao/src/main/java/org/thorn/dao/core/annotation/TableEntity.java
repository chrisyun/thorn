package org.thorn.dao.core.annotation;

import java.util.ArrayList;
import java.util.List;

/** 
 * @ClassName: TableEntity 
 * @Description: TODO
 * @author chenyun
 * @date 2012-4-26 下午05:13:12 
 */
public class TableEntity {
	
	private Table table;
	
	private List<ColumnEntity> column = new ArrayList<ColumnEntity>();

	public Table getTable() {
		return table;
	}

	public void setTable(Table table) {
		this.table = table;
	}

	public List<ColumnEntity> getColumn() {
		return column;
	}

	public void setColumn(List<ColumnEntity> column) {
		this.column = column;
	}
	
}

