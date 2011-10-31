package org.cy.thorn.dd.dao;

import java.util.List;
import java.util.Map;

import org.cy.thorn.core.entity.Page;
import org.cy.thorn.core.entity.ResultPage;
import org.cy.thorn.core.entity.ResultSet;
import org.cy.thorn.core.entity.Sorting;
import org.cy.thorn.core.exceptions.DBAccessException;
import org.cy.thorn.dd.entity.Dict;
import org.cy.thorn.dd.entity.DictType;

/**
 * <p>文件名称: IDataDictDao.java</p>
 * <p>文件描述: 本类描述</p>
 * <p>版权所有: 版权所有(C)2010</p>
 * <p>内容摘要: 简要描述本文件的内容，包括主要模块、函数及能的说明</p>
 * <p>其他说明: 其它内容的说明</p>
 * <p>完成日期: 2011-10-18</p>
 * <p>修改记录1:</p>
 * <pre>
 *    修改日期:
 *    修 改 人:
 *    修改内容:
 * </pre>
 * <p>修改记录2：…</p>
 * @author  chenyun
 */
public interface IDataDictDAO {
	
	/**
	 * 
	 * @author：chenyun 	        
	 * @date：2011-10-18
	 * @Description：新增数据字典类型
	 * @param dictType
	 * @throws DBAccessException
	 */
	public void insertDtType(DictType dictType) throws DBAccessException;
	
	/**
	 * 
	 * @author：chenyun 	        
	 * @date：2011-10-18
	 * @Description：新增数据字典项
	 * @param dict
	 * @throws DBAccessException
	 */
	public void insertDt(Dict dict) throws DBAccessException; 
	
	/**
	 * 
	 * @author：chenyun 	        
	 * @date：2011-10-18
	 * @Description：更新数据字典类型
	 * @param dictType
	 * @throws DBAccessException
	 */
	public void updateDtType(DictType dictType) throws DBAccessException;
	
	/**
	 * 
	 * @author：chenyun 	        
	 * @date：2011-10-18
	 * @Description：更新数据字典项
	 * @param dict
	 * @throws DBAccessException
	 */
	public void updateDt(Dict dict) throws DBAccessException;
	
	/**
	 * 
	 * @author：chenyun 	        
	 * @date：2011-10-18
	 * @Description：根据字典类型ID删除字典类型及字典数据项
	 * @param ids	  字典类型ID集合
	 * @throws DBAccessException
	 */
	public void deleteByTypeId(List<String> ids) throws DBAccessException;
	
	/**
	 * 
	 * @author：chenyun 	        
	 * @date：2011-10-18
	 * @Description：根据字典数据ID删除字典数据项
	 * @param ids
	 * @throws DBAccessException
	 */
	public void deleteDt(List<String> ids) throws DBAccessException;
	
	/**
	 * 
	 * @author：chenyun 	        
	 * @date：2011-10-18
	 * @Description：分页查询数据字典类型
	 * @param filter
	 * @param sort
	 * @param page
	 * @return
	 * @throws DBAccessException
	 */
	public ResultPage<DictType> searchDtTypeByPage(Map<String, Object> filter, 
			Sorting sort, Page page) throws DBAccessException;
	
	/**
	 * 
	 * @author：chenyun 	        
	 * @date：2011-10-18
	 * @Description：
	 * @param ename
	 * @return
	 * @throws DBAccessException
	 */
	public DictType searchDtTypeByPK(String ename) throws DBAccessException;
	
	/**
	 * 
	 * @author：chenyun 	        
	 * @date：2011-10-18
	 * @Description：根据类型ID查找数据字典项
	 * @param typeId
	 * @return
	 * @throws DBAccessException
	 */
	public ResultSet<Dict> searchDt(String typeId) throws DBAccessException;
	
	/**
	 * 
	 * @author：chenyun 	        
	 * @date：2011-10-18
	 * @Description：
	 * @param dname	
	 * @return
	 * @throws DBAccessException
	 */
	public Dict searchByPk(String dname) throws DBAccessException;
	
}

