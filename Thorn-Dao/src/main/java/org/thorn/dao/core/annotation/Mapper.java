package org.thorn.dao.core.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/** 
 * @ClassName: Mapper 
 * @Description: TODO
 * @author chenyun
 * @date 2012-4-26 下午02:11:26 
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Mapper {
	String nameSpace();
	
	String key() default "id";
	
	String insert_Id() default "insertOne";
	
	String update_Id() default "updateOne";
	
	String delete_Id() default "deleteOne";
	
	String deleteBatch_Id() default "deleteBatch";
	
	String query_Id() default "queryOne";
	
	String queryForList_Id() default "queryForList";
	
	String queryForPage_Id() default "queryForPage";
	
	String queryForPageCount_Id() default "queryForPageCount";
}

