package org.thorn.resource.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thorn.core.util.LocalStringUtils;
import org.thorn.dao.core.Configuration;
import org.thorn.dao.core.Page;
import org.thorn.dao.exception.DBAccessException;
import org.thorn.resource.entity.Resource;
import org.thorn.resource.service.IResourceService;
import org.thorn.web.JsonResponse;
import org.thorn.web.Status;
import org.thorn.web.BaseController;
import org.thorn.web.Tree;

/**
 * @ClassName: ResourceController
 * @Description:
 * @author chenyun
 * @date 2012-5-6 下午10:51:39
 */
@Controller
public class ResourceController extends BaseController {

	static Logger log = LoggerFactory.getLogger(ResourceController.class);

	@Autowired
	@Qualifier("resourceService")
	private IResourceService service;

	@RequestMapping("/resource/getLeftTree")
	@ResponseBody
	public List<Tree> getLeftTree(String pid) {
		List<Tree> tree = new ArrayList<Tree>();

		try {
			List<Resource> source = service.queryLeftTree(pid);
			for (Resource res : source) {
				Tree node = new Tree();
				node.setId(String.valueOf(res.getSourceCode()));
				node.setText(String.valueOf(res.getSourceName()));
				node.setPid(String.valueOf(res.getParentSource()));

				node.setTargetUrl(res.getSourceUrl());
				node.setIconCls(res.getIconsCls());

				if (LocalStringUtils.equals(res.getIsleaf(),
						Configuration.DB_YES)) {
					node.setLeaf(true);
				} else {
					node.setLeaf(false);
				}
				tree.add(node);
			}
		} catch (Exception e) {
			log.error("getLeftTree[Resource] - " + e.getMessage(), e);
		}

		return tree;
	}
	
	@RequestMapping("/resource/getSourceTree")
	@ResponseBody
	public List<Tree> getSourceTree(String pid) {
		List<Tree> tree = new ArrayList<Tree>();

		try {
			List<Resource> source = service.queryLeftTree(pid);
			for (Resource res : source) {
				Tree node = new Tree();
				node.setId(String.valueOf(res.getSourceCode()));
				node.setText(String.valueOf(res.getSourceName()));
				node.setPid(String.valueOf(res.getParentSource()));

				node.setTargetUrl(res.getSourceUrl());
				node.setIconCls(res.getIconsCls());

				if (LocalStringUtils.equals(res.getIsleaf(),
						Configuration.DB_YES)) {
					node.setLeaf(true);
				} else {
					node.setLeaf(false);
				}
				tree.add(node);
			}
		} catch (Exception e) {
			log.error("getLeftTree[Resource] - " + e.getMessage(), e);
		}

		return tree;
	}
	
	@RequestMapping("/resource/saveOrModify")
	@ResponseBody
	public Status saveOrModifyOrg(Resource source, String opType) {
		Status status = new Status();

		try {

			if (LocalStringUtils.equals(opType, Configuration.OP_SAVE)) {
				service.save(source);
				status.setMessage("新增资源成功！");
			} else if (LocalStringUtils.equals(opType, Configuration.OP_MODIFY)) {
				service.modify(source);
				status.setMessage("修改资源成功！");
			}

		} catch (DBAccessException e) {
			status.setSuccess(false);
			status.setMessage("数据保存失败：" + e.getMessage());
			log.error("saveOrModifyOrg[Resource] - " + e.getMessage(), e);
		}

		return status;
	}
	
	@RequestMapping("/resource/delete")
	@ResponseBody
	public Status deleteResource(String ids) {
		Status status = new Status();

		try {
			service.delete(ids);
			status.setMessage("数据删除成功！");
		} catch (DBAccessException e) {
			status.setSuccess(false);
			status.setMessage("数据删除失败：" + e.getMessage());
			log.error("deleteResource[Resource] - " + e.getMessage(), e);
		}

		return status;
	}
	
	@RequestMapping("/resource/getSourcePage")
	@ResponseBody
	public Page<Resource> getOrgPage(long start, long limit, String sort,
			String dir, String pid, String sourceCode, String sourceName) {
		Page<Resource> page = new Page<Resource>();

		try {
			page = service.queryPage(pid, sourceCode, sourceName, start,
					limit, sort, dir);
		} catch (DBAccessException e) {
			log.error("getOrgPage[Resource] - " + e.getMessage(), e);
		}

		return page;
	}
	
	@RequestMapping("/resource/getResource")
	@ResponseBody
	public JsonResponse<Resource> getResource(String sourceCode) {
		JsonResponse<Resource> json = new JsonResponse<Resource>();
		
		try {
			Resource source = service.queryResource(sourceCode);
			json.setObj(source);
		} catch (DBAccessException e) {
			json.setSuccess(false);
			json.setMessage("资源数据查询失败：" + e.getMessage());
		}
		
		return json;
	}
	
	
}
