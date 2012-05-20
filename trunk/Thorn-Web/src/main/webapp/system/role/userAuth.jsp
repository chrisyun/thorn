<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="thorn" uri="/thorn"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<jsp:include page="../../reference/meta.jsp"></jsp:include>
		<title>UserAuth - Manage</title>
	</head>
	<jsp:include page="../../reference/core.jsp"></jsp:include>
	<script type="text/javascript" src="../org/orgTree.js"></script>
	<script type="text/javascript" src="userAuth.js"></script>
	<script type="text/javascript">
		var defaultRole = <thorn:dd  typeId="DEFAULTROLE" />;
		var defaultRoleRender = function(role) {
			return Render.dictRender(defaultRole, role);
		}
	</script>
	<body>

	</body>
</html>
