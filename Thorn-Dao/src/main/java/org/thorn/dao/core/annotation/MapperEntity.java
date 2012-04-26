package org.thorn.dao.core.annotation;

import java.util.ArrayList;
import java.util.List;

/** 
 * @ClassName: MapperEntity 
 * @Description: TODO
 * @author chenyun
 * @date 2012-4-26 下午03:37:23 
 */
public class MapperEntity {
	
	private Mapper mapper;
	
	private List<ColumnEntity> column = new ArrayList<ColumnEntity>();
	
	public Mapper getMapper() {
		return mapper;
	}

	public void setMapper(Mapper mapper) {
		this.mapper = mapper;
	}

	public List<ColumnEntity> getColumn() {
		return column;
	}

	public void setColumn(List<ColumnEntity> column) {
		this.column = column;
	}
}

