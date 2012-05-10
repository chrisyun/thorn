<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="org.springframework.security.core.Authentication"%>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%>
<%@page import="org.thorn.security.entity.UserSecurity"%>
<%@page import="org.thorn.user.entity.User"%>
<%@ taglib prefix="thorn" uri="/thorn"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

Authentication auth = SecurityContextHolder.getContext().getAuthentication();
String userId = "";
String userName = "";
String cumail = "";
String phone = "";

if(auth != null) {
	UserSecurity us = (UserSecurity) auth.getPrincipal();
	User user = us.getUser();
	userId = user.getUserId();
	userName = user.getUserName();
	cumail = user.getCumail();
	phone = user.getPhone();
}

%>
<jsp:include page="/springTag/ext.jmt"></jsp:include>
<script type="text/javascript">
	var sys = {
		path		: "<%=path%>",
		basePath	: "<%=basePath%>"
	};

	var user = {
		userId 		: "<%=userId%>",
		userName 	: "<%=userName%>",
		cumail 		: "<%=cumail%>",
		phone 		: "<%=phone%>"
	}
	
	var yesOrNo = <thorn:dd  typeId="YESORNO" />;
	
	var yesOrNoRender = function(status) {
		return Render.dictRender(yesOrNo, status);
	};
	
</script>