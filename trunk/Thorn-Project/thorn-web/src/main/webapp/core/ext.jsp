<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!-- EXT样式文件 -->
<link rel="stylesheet" type="text/css" href="<%=path %>/plugins/ext-3.2.1/resources/css/ext-all.css" />
<!-- 驱动JS -->
<script type="text/javascript" src="<%=path %>/plugins/ext-3.2.1/adapter/ext/ext-base.js" ></script>
<!-- EXTjs -->
<script type="text/javascript" src="<%=path %>/plugins/ext-3.2.1/ext-all.js" ></script>


<script type="text/javascript" src="<%=path %>/plugins/local/common.js" ></script>
