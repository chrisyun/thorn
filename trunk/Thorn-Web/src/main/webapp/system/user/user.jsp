<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="thorn" uri="/thorn"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<jsp:include page="../../reference/meta.jsp"></jsp:include>
		<title>User - Manage</title>
	</head>
	<jsp:include page="../../reference/core.jsp"></jsp:include>
	<script type="text/javascript" src="user.js"></script>
	<script type="text/javascript" src="../org/orgTree.js"></script>
	<script type="text/javascript">
		var area = <thorn:dd  typeId="AREA" />;
		var areaRender = function(str) {
			return Render.dictRender(area, str);
		};
		
		var defaultRole = <thorn:dd  typeId="DEFAULTROLE" />;
		var defaultRoleRender = function(role) {
			return Render.dictRender(defaultRole, role);
		}
		
		var gender = <thorn:dd  typeId="GENDER" />;
		var genderRender = function(str) {
			return Render.dictRender(gender, str);
		}
		
	</script>
	<body>

	</body>
</html>
