package org.thorn.resource.entity;

import java.io.Serializable;

/** 
 * @ClassName: Resource 
 * @Description: 
 * @author chenyun
 * @date 2012-5-4 下午03:34:10 
 */
public class Resource implements Serializable {

	/** */
	private static final long serialVersionUID = -4442394145188069847L;
	
	private String sourceCode;
	
	private String sourceUrl;
	
	private String sourceName;

	public String getSourceCode() {
		return sourceCode;
	}

	public void setSourceCode(String sourceCode) {
		this.sourceCode = sourceCode;
	}

	public String getSourceUrl() {
		return sourceUrl;
	}

	public void setSourceUrl(String sourceUrl) {
		this.sourceUrl = sourceUrl;
	}

	public String getSourceName() {
		return sourceName;
	}

	public void setSourceName(String sourceName) {
		this.sourceName = sourceName;
	}
	
	
	
}

