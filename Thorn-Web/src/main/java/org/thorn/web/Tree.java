package org.thorn.web;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * @ClassName: Tree
 * @Description:
 * @author chenyun
 * @date 2012-5-6 下午10:48:47
 */
public class Tree implements Serializable {

	/** */
	private static final long serialVersionUID = -3356574016612237972L;

	private String id;

	private String text;

	private String pid;

	private boolean leaf;

	private String cls;
	
	private String targetUrl;

	private Map<String, String> attributes = new HashMap<String, String>();

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public boolean isLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public String getCls() {
		return cls;
	}

	public void setCls(String cls) {
		this.cls = cls;
	}

	public Map<String, String> getAttributes() {
		return attributes;
	}

	public void setAttributes(Map<String, String> attributes) {
		this.attributes = attributes;
	}

	public String getTargetUrl() {
		return targetUrl;
	}

	public void setTargetUrl(String targetUrl) {
		this.targetUrl = targetUrl;
	}
}