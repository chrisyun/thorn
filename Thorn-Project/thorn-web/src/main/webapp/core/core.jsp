<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<jsp:include page="ext.jsp"></jsp:include>

<script type="text/javascript">
	var sys = {
		path		: "<%=path%>",
		basePath	: "<%=basePath%>"
	};

</script>