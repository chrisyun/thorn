package org.thorn.dao.util;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

import org.springframework.util.Assert;
import org.thorn.dao.core.annotation.Column;
import org.thorn.dao.core.annotation.ColumnEntity;
import org.thorn.dao.core.annotation.Mapper;
import org.thorn.dao.core.annotation.MapperEntity;

/**
 * @ClassName: MapperUtil
 * @Description: TODO
 * @author chenyun
 * @date 2012-4-26 下午02:40:03
 */
public class MapperUtil {

	private final static String TOGETHER_SYMBOLS = ".";

	private static Map<String, MapperEntity> annotation = new HashMap<String, MapperEntity>();

	public static String getInsertMapper(Class obj) {

		MapperEntity mapper = MapperUtil.getFormAnnotationMap(obj);

		return mapper.getMapper().nameSpace() + TOGETHER_SYMBOLS
				+ mapper.getMapper().insert_Id();
	}

	public static String getUpdateMapper(Class obj) {

		MapperEntity mapper = MapperUtil.getFormAnnotationMap(obj);

		return mapper.getMapper().nameSpace() + TOGETHER_SYMBOLS
				+ mapper.getMapper().update_Id();
	}

	public static String getDeleteMapper(Class obj) {

		MapperEntity mapper = MapperUtil.getFormAnnotationMap(obj);

		return mapper.getMapper().nameSpace() + TOGETHER_SYMBOLS
				+ mapper.getMapper().delete_Id();
	}

	public static String getQueryMapper(Class obj) {

		MapperEntity mapper = MapperUtil.getFormAnnotationMap(obj);

		return mapper.getMapper().nameSpace() + TOGETHER_SYMBOLS
				+ mapper.getMapper().query_Id();
	}

	public static String getQueryForListMapper(Class obj) {

		MapperEntity mapper = MapperUtil.getFormAnnotationMap(obj);

		return mapper.getMapper().nameSpace() + TOGETHER_SYMBOLS
				+ mapper.getMapper().queryForList_Id();
	}

	public static String getQueryForPageMapper(Class obj) {

		MapperEntity mapper = MapperUtil.getFormAnnotationMap(obj);

		return mapper.getMapper().nameSpace() + TOGETHER_SYMBOLS
				+ mapper.getMapper().queryForPage_Id();
	}
	
	public static String getQueryForPageCountMapper(Class obj) {

		MapperEntity mapper = MapperUtil.getFormAnnotationMap(obj);

		return mapper.getMapper().nameSpace() + TOGETHER_SYMBOLS
				+ mapper.getMapper().queryForPageCount_Id();
	}

	public static String getDeleteBatchMapper(Class obj) {

		MapperEntity mapper = MapperUtil.getFormAnnotationMap(obj);

		return mapper.getMapper().nameSpace() + TOGETHER_SYMBOLS
				+ mapper.getMapper().deleteBatch_Id();
	}

	private static MapperEntity getFormAnnotationMap(Class obj) {

		String class_name = obj.getName();

		MapperEntity mapper = annotation.get(class_name);

		if (mapper == null) {
			// first load
			addAnnotationMap(obj);

			mapper = annotation.get(class_name);
		}

		Assert.isNull(mapper);
		return mapper;
	}

	private static void addAnnotationMap(Class obj) {

		if (!obj.isAnnotationPresent(Mapper.class)) {
			return;
		}

		Mapper mapper = (Mapper) obj.getAnnotation(Mapper.class);

		// class annotation
		MapperEntity entity = new MapperEntity();
		entity.setMapper(mapper);

		// property annotation
		Field[] fields = obj.getDeclaredFields();

		for (Field field : fields) {

			Column column = field.getAnnotation(Column.class);

			if (column != null) {
				ColumnEntity clentity = new ColumnEntity();
				clentity.setColumn(column);
				clentity.setName(field.getName());

				entity.getColumn().add(clentity);
			}
		}

		String class_name = obj.getName();

		synchronized (entity) {
			annotation.put(class_name, entity);
		}

	}

}
