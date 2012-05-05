package org.thorn.web;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/** 
 * @ClassName: TagController 
 * @Description: 
 * @author chenyun
 * @date 2012-5-5 下午11:00:33 
 */
@Controller
public class TagController {
	
	@RequestMapping("/springTag/ext")
	public String ext() {
		return "/reference/ext";
	}
	
}

