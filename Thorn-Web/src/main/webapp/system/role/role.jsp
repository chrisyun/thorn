<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="thorn" uri="/thorn"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<jsp:include page="../../reference/meta.jsp"></jsp:include>
		<title>Role - Manage</title>
	</head>
	<jsp:include page="../../reference/core.jsp"></jsp:include>
	<script type="text/javascript" src="role.js"></script>
	<script type="text/javascript">
		var iconCls = <thorn:dd  typeId="ICONCLS" />;
		var iconClsRender = function(icon) {
			return Render.dictRender(iconCls, icon);
		};
	</script>
	<body>

	</body>
</html>
