package org.thorn.dao.core.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/** 
 * @ClassName: Table 
 * @Description: TODO
 * @author chenyun
 * @date 2012-4-26 下午02:06:05 
 */

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Table {
	String name();
	
	String key() default "id";
}

