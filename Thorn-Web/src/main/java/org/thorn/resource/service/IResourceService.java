package org.thorn.resource.service;

import java.util.List;

import org.thorn.dao.core.Page;
import org.thorn.dao.exception.DBAccessException;
import org.thorn.resource.entity.Resource;

/**
 * @ClassName: IResourceService
 * @Description:
 * @author chenyun
 * @date 2012-5-4 下午03:35:41
 */
public interface IResourceService {

	// public List<Resource> queryResourceByRole(List<String> roleId) throws
	// DBAccessException;

	public List<Resource> queryAllResource() throws DBAccessException;

	public List<Resource> queryLeftTree(String pid) throws DBAccessException;

	public void save(Resource source) throws DBAccessException;

	public void modify(Resource source) throws DBAccessException;

	public void delete(String ids) throws DBAccessException;

	public Page<Resource> queryPage(String pid, String sourceCode,
			String sourceName, long start, long limit, String sort, String dir)
			throws DBAccessException;

	public Resource queryResource(String sourceCode) throws DBAccessException;
}
