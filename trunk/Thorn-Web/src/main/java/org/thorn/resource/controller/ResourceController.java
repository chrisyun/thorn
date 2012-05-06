package org.thorn.resource.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thorn.dao.core.Configuration;
import org.thorn.resource.entity.Resource;
import org.thorn.resource.service.IResourceService;
import org.thorn.web.Tree;

/** 
 * @ClassName: ResourceController 
 * @Description: 
 * @author chenyun
 * @date 2012-5-6 下午10:51:39 
 */
@Controller
public class ResourceController {
	
	@Autowired
	@Qualifier("resourceService")
	private IResourceService service;
	
	@RequestMapping("/resource/getLeftTree")
	@ResponseBody
	public List<Tree> getLeftTree(String pid) {
		List<Tree> tree = new ArrayList<Tree>();
		
		try {
			List<Resource> source = service.queryLeftTree(pid);
			for(Resource res : source) {
				Tree node = new Tree();
				node.setId(String.valueOf(res.getSourceCode()));
				node.setText(String.valueOf(res.getSourceName()));
				node.setPid(String.valueOf(res.getParentSource()));
				node.setTargetUrl(res.getSourceUrl());
				
				node.setCls(res.getIconsCls());
				
				if(StringUtils.equals(res.getIsleaf(), Configuration.DB_YES)) {
					node.setLeaf(true);
				} else {
					node.setLeaf(false);
				}
				tree.add(node);
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		return tree;
		
	}
	
}

