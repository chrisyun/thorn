package org.thorn.web;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.theme.CookieThemeResolver;

/**
 * @ClassName: TagController
 * @Description:
 * @author chenyun
 * @date 2012-5-5 下午11:00:33
 */
@Controller
public class SystemController {

	@RequestMapping("/springTag/ext")
	public String ext() {
		return "/reference/ext";
	}

	@RequestMapping("/theme/change")
	@ResponseBody
	public Status changeTheme(String theme, HttpServletResponse response) {
		Cookie cookie = new Cookie(
				CookieThemeResolver.THEME_REQUEST_ATTRIBUTE_NAME, theme);
		response.addCookie(cookie);
		
		Status status = new Status();
		status.setMsg("更换皮肤成功!");
		
		return status;
	}

}
