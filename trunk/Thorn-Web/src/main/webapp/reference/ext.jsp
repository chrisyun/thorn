<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="thorn" uri="/thorn"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<link rel="stylesheet" type="text/css" href="<%=path %><spring:theme code="css" />" />

<!--  <thorn:dd  typeId="test" />     -->
<!-- 驱动JS -->
<script type="text/javascript" src="<%=path %>/plugins/ext-3.2.1/adapter/ext/ext-base.js" ></script>
<!-- EXTjs -->
<script type="text/javascript" src="<%=path %>/plugins/ext-3.2.1/ext-all.js" ></script>

<!-- local css and js -->
<script type="text/javascript" src="<%=path %>/plugins/local/common.js" ></script>
<script type="text/javascript" src="<%=path %>/plugins/local/render.js" ></script>
<script type="text/javascript" src="<%=path %>/plugins/local/theme.js" ></script>
<script type="text/javascript" src="<%=path %>/plugins/local/grid.js" ></script>
<script type="text/javascript" src="<%=path %>/plugins/local/formPanel.js" ></script>
<script type="text/javascript" src="<%=path %>/plugins/local/openWin.js" ></script>
<link rel="stylesheet" type="text/css" href="<%=path %>/resources/localStyle.css" />


<script type="text/javascript">
<!--
Ext.BLANK_IMAGE_URL = "<%=path %>/resources/images/default/s.gif";
//-->
</script>
