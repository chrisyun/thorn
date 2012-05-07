<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>Access Denied</title>
	<style>
	<!--
	body {
		background-color: #4E79B2;
	}
	.error {
    	width: 260px;
    	height : 180px;
    	border: 2px solid green;
    	background-color: yellow;
    	text-align: center;
	}
	-->
	</style>

  </head>
  
  <body>
    <div class="error">访问被拒绝<br>
      ${requestScope['SPRING_SECURITY_403_EXCEPTION'].message}
    </div>
  </body>
</html>
