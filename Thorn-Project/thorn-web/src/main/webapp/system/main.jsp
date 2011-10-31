<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="org.cy.thorn.security.UserSecurity"%>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'main.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<%
	UserSecurity us = (UserSecurity) SecurityContextHolder.getContext()
					.getAuthentication().getPrincipal();
%>
  </head>
  
  <body>
    This is my JSP page. <br>
    print : <%=us.getUname() + "--" + us.getUserid() + "--" + us.getUsername() %>
  </body>
</html>
