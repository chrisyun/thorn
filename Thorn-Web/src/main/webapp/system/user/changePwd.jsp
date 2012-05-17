<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="thorn" uri="/thorn"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<jsp:include page="../../reference/meta.jsp"></jsp:include>
		<title>User - Manage</title>
	</head>
	<jsp:include page="../../reference/core.jsp"></jsp:include>
	<script type="text/javascript" src="userPwd.js"></script>
	<script type="text/javascript">
	Ext.onReady(function() {
		var Pwd_Obj = new UserPwd("my");
		
		Pwd_Obj.show();
		
		var panel = new Ext.Panel({
			title : "&nbsp;",
			bodyStyle : "padding-top: 7px;",
			region : "center",
			margins : "2 0 0 0"
		});
		
		var viewport = new Ext.Viewport({
			border : true,
			layout : "border",
			items : [panel]
		});
		
	});	
		
	</script>
	<body>

	</body>
</html>
