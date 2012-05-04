package org.thorn.security.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.TextEscapeUtils;
import org.springframework.util.StringUtils;
import org.thorn.security.SecurityConfiguration;

public class LoginAuthWithCodeFilter extends
		UsernamePasswordAuthenticationFilter {

	private boolean postOnly = true;
	private boolean allowEmptyValidateCode = false;
	private String sessionvalidateCodeField = SecurityConfiguration.AUTHCODE_SESSION_ID;
	private String validateCodeParameter = SecurityConfiguration.AUTHCODE_FROM_ID;

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request,
			HttpServletResponse response) throws AuthenticationException {
		if (postOnly && !request.getMethod().equals("POST")) {
			throw new AuthenticationServiceException(
					"Authentication method not supported: "
							+ request.getMethod());
		}

		String username = obtainUsername(request);
		String password = obtainPassword(request);

		if (username == null) {
			username = "";
		}

		if (password == null) {
			password = "";
		}

		username = username.trim();

		UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
				username, password);

		// Place the last username attempted into HttpSession for views
		HttpSession session = request.getSession(false);

		if (session != null || getAllowSessionCreation()) {
			request.getSession().setAttribute(
					SPRING_SECURITY_LAST_USERNAME_KEY,
					TextEscapeUtils.escapeEntities(username));
		}

		// Allow subclasses to set the "details" property
		setDetails(request, authRequest);
		// check validate code
		if (!isAllowEmptyValidateCode())
			checkValidateCode(request);
		return this.getAuthenticationManager().authenticate(authRequest);
	}

	/**
	 * 
	 * <li>比较session中的验证码和用户输入的验证码是否相等</li>
	 * 
	 */
	protected void checkValidateCode(HttpServletRequest request) {
		String sessionValidateCode = obtainSessionValidateCode(request);
		String validateCodeParameter = obtainValidateCodeParameter(request);
		if (!StringUtils.hasText(validateCodeParameter)
				|| !sessionValidateCode.equalsIgnoreCase(validateCodeParameter)) {
			throw new AuthenticationServiceException(
					messages.getMessage("validateCode.notEquals"));
		}
	}

	private String obtainValidateCodeParameter(HttpServletRequest request) {
		String code = request.getParameter(validateCodeParameter);
		if (StringUtils.hasText(code)) {
			code = code.toUpperCase();
		}
		return code;
	}

	protected String obtainSessionValidateCode(HttpServletRequest request) {
		Object obj = request.getSession()
				.getAttribute(sessionvalidateCodeField);
		return null == obj ? "" : obj.toString().toUpperCase();
	}

	public boolean isPostOnly() {
		return postOnly;
	}

	@Override
	public void setPostOnly(boolean postOnly) {
		this.postOnly = postOnly;
	}

	public String getValidateCodeName() {
		return sessionvalidateCodeField;
	}

	public void setValidateCodeName(String validateCodeName) {
		this.sessionvalidateCodeField = validateCodeName;
	}

	public boolean isAllowEmptyValidateCode() {
		return allowEmptyValidateCode;
	}

	public void setAllowEmptyValidateCode(boolean allowEmptyValidateCode) {
		this.allowEmptyValidateCode = allowEmptyValidateCode;
	}

}
