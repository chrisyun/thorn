package org.cy.thorn.test;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.cy.thorn.core.entity.ResultPage;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * <p>文件名称: TestController.java</p>
 * <p>文件描述: 本类描述</p>
 * <p>版权所有: 版权所有(C)2010</p>
 * <p>内容摘要: 简要描述本文件的内容，包括主要模块、函数及能的说明</p>
 * <p>其他说明: 其它内容的说明</p>
 * <p>完成日期: 2011-10-10</p>
 * <p>修改记录1:</p>
 * <pre>
 *    修改日期:
 *    修 改 人:
 *    修改内容:
 * </pre>
 * <p>修改记录2：…</p>
 * @author  chenyun
 */
@Controller
public class TestController {
	
	@RequestMapping("/helloWorld")
	public String helloWorld(
//			@PathVariable("id") int id,
			Model model,
			HttpServletRequest request) {
//		System.out.println(id);
		model.addAttribute("message", "hello world");
		
		int a = 100/0;
		
		return "login";
	}
	
//	@RequestMapping("/getJson")
//	@ResponseBody
//	public ResultPage<User> returnJson() {
//		
//		ResultPage<User> page = new ResultPage<User>(20, 2);
//		
//		List<User> list = new ArrayList<User>();
//		User user1 = new User();
//		user1.setId("ts00027");
//		user1.setName("uname");
//		user1.setAge(30);
//		list.add(user1);
//		
//		User user2 = new User();
//		user2.setId("ts00027op");
//		user2.setName("uname");
//		user2.setAge(30);
//		
//		list.add(user2);
//		
//		page.setResult(list);
//		page.setCount(20);
//		
//		
//		return page;
//	}
	
	@RequestMapping("/setJson")
	@ResponseBody
	public User getJson(@RequestBody User u) {
		System.out.println(u.getName());
		
		User user = new User();
		user.setId("ts00027");
		user.setName("uname");
		user.setAge(30);
		
		return user;
		
	}
	
	@RequestMapping("/testMehod")
	@ResponseBody
	public TestBean testMehod(@RequestBody TestBean u) {
		return u;
	}
	
}

