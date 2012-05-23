package org.thorn.dao.mybatis.cache;

import java.util.concurrent.locks.ReadWriteLock;

import org.apache.ibatis.cache.Cache;

/** 
 * @ClassName: ExempleCache 
 * @Description: mybatis自定义的缓存的示例，需要在每个二级sql映射文件中配置
 * <cache type=”com.domain.something.MyCustomCache”>
 *		<property name=”cacheFile” value=”/tmp/my-custom-cache.tmp”/>
 *	</cache>
 *<cache-ref namespace=”com.someone.application.data.SomeMapper”/>参照缓存
 * @author chenyun
 * @date 2012-4-27 下午03:31:53 
 */
public class ExempleCache implements Cache {

	public String getId() {
		// : Auto-generated method stub
		return null;
	}

	public int getSize() {
		// : Auto-generated method stub
		return 0;
	}

	public void putObject(Object key, Object value) {
		// : Auto-generated method stub

	}

	public Object getObject(Object key) {
		// : Auto-generated method stub
		return null;
	}

	public Object removeObject(Object key) {
		// : Auto-generated method stub
		return null;
	}

	public void clear() {
		// : Auto-generated method stub

	}

	public ReadWriteLock getReadWriteLock() {
		// : Auto-generated method stub
		return null;
	}

}
