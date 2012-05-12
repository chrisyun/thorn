<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="thorn" uri="/thorn"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<jsp:include page="../../reference/meta.jsp"></jsp:include>
		<title>Org - Manage</title>
	</head>
	<jsp:include page="../../reference/core.jsp"></jsp:include>
	<script type="text/javascript" src="org.js"></script>
	<script type="text/javascript" src="orgTree.js"></script>
	<script type="text/javascript">
		var orgType = <thorn:dd  typeId="ORGTYPE" />;
		var orgTypeRender = function(type) {
			return Render.dictRender(orgType, type);
		};
		
		var area = <thorn:dd  typeId="AREA" />;
		var areaRender = function(str) {
			return Render.dictRender(area, str);
		};
		
		
	</script>
	<body>

	</body>
</html>
