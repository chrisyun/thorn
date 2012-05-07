package org.thorn.dd.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.thorn.dao.core.Page;
import org.thorn.dao.exception.DBAccessException;
import org.thorn.dd.entity.Dict;
import org.thorn.dd.entity.DictType;
import org.thorn.resource.dao.ResourceDaoImpl;

/** 
 * @ClassName: DataDictImpl 
 * @Description: 
 * @author chenyun
 * @date 2012-5-7 上午10:46:30 
 */
public class DataDictImpl implements IDataDictDao {

	static Logger log = LoggerFactory.getLogger(DataDictImpl.class);

	private final static String nameSpace = "DictMapper.";

	@Autowired
	@Qualifier("sqlSessionTemplate")
	private SqlSessionTemplate sqlSessionTemplate;
	
	public Page<DictType> queryDtPage(Map<String, Object> filter)
			throws DBAccessException {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Dict> queryDdList(Map<String, Object> filter)
			throws DBAccessException {
		// TODO Auto-generated method stub
		return null;
	}

	public int saveDd(Dict dd) throws DBAccessException {
		// TODO Auto-generated method stub
		return 0;
	}

	public int saveDt(DictType dt) throws DBAccessException {
		// TODO Auto-generated method stub
		return 0;
	}

	public int modifyDd(Dict dd) throws DBAccessException {
		// TODO Auto-generated method stub
		return 0;
	}

	public int modifyDt(DictType dt) throws DBAccessException {
		// TODO Auto-generated method stub
		return 0;
	}

	public int deleteDd(List<String> ids) throws DBAccessException {
		// TODO Auto-generated method stub
		return 0;
	}

	public int deleteDt(List<String> ids) throws DBAccessException {
		// TODO Auto-generated method stub
		return 0;
	}

	public int deleteDdByType(List<String> ids) throws DBAccessException {
		// TODO Auto-generated method stub
		return 0;
	}

}

