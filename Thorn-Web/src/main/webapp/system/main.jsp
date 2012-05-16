<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<jsp:include page="../reference/meta.jsp"></jsp:include>
		<title>Home - Page</title>
	</head>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";	
%>
	<jsp:include page="../reference/core.jsp"></jsp:include>

	<script type="text/javascript">
	var tabNum = 0;
	
	Ext.onReady(function() {
		Ext.QuickTips.init();

		var loader = new Ext.tree.TreeLoader( {
			url : sys.basePath + "/resource/getLeftTree.jmt"
		});
		loader.on("beforeload", function(loader, node) {
			loader.baseParams.pid = node.id;
		});
		
		var sysMenuTree = new Ext.tree.TreePanel( {
		    border: false,
		    useArrows: true,
			rootVisible: false,
		 	loader: loader,
			root : new Ext.tree.AsyncTreeNode({
				text : "系统管理",
				id: 'SYS',
				leaf: false
			})
		});
		
		var navMenuTree = new Ext.tree.TreePanel( {
		    border: false,
		    useArrows: true,
			rootVisible: false,
			loader: loader,
			root : new Ext.tree.AsyncTreeNode({
				text : "导航菜单",
				id: 'NAV',
				leaf: false
			})
		});
		
		var menuPanel = new Ext.Panel( {
			region : 'west',
			title : '当前用户：' + user.userName,
			split : true,
			width : 200,
			minSize : 175,
			maxSize : 400,
			collapsible : true,
			margins : '2 0 2 0',
			layout : {
				type : 'accordion',
				animate : true
			},
			items : [ {
				title : '导航菜单',
				border : false,
				iconCls : 'silk-nav',
				items : [navMenuTree]
			}, {
				title : '系统管理',
				html : '',
				border : false,
				iconCls : 'silk-settings',
				items : [sysMenuTree]
			} ],
			tbar : [ {
				text : '选项',
				iconCls : 'silk-application-view-list',
				menu : new Ext.menu.Menu( {
					items : [ {
						text : '更换皮肤',
					 	menu: {
               				items: skinItemArray
               			}
					}, {
						text : '注销',
						iconCls : 'silk-logout',
						handler : logout
					} ]
				})
				}, "-", {
					text : "刷新",
					iconCls : 'silk-table-refresh',
					handler: function(){
						sysMenuTree.getRootNode().reload();
						navMenuTree.getRootNode().reload();
	    			}
				}]
		});

		var mainTab = new Ext.TabPanel( {
			region : 'center',
			activeTab : 0,
			margins : '2 0 2 0',
			resizeTabs : true,
			border : false,
			minTabWidth : 200,
			items : [ {
				title : "首页",
				autoScroll : true
			}]
		});

		var treeClick = function(node, ev){
			var isLeaf = node.leaf;
			var openUrl = sys.basePath + node.attributes.targetUrl;
			
			if(isLeaf == false || Ext.isEmpty(openUrl)) {
				return ;
			}

			if(!Ext.isEmpty(openUrl)){
    			var prefix = '?';
    			if (openUrl.indexOf('?') > -1) {
    				prefix = '&'
        		}
    			openUrl = openUrl + prefix + "random=" + Math.random();
           	}
			
			var activateId = mainTab.getActiveTab().getItemId();
			
			if(tabNum < 2) {
				tabNum++;
			} else if(activateId != node.id) {
				mainTab.remove(1);
			}
			
			mainTab.add( {
				title : node.text,
				html : "<iframe src='"+ openUrl +"' width='100%' height='100%' frameborder='0'></iframe>",
				iconCls : node.attributes.iconCls,
				id : node.id,
				closable : true,
				listeners : {beforeclose:function(){
					tabNum--;
				}}	
			});
			mainTab.activate(node.id);
		}
		
		navMenuTree.on('click',function(node, ev){
			treeClick(node,ev);
		});

		sysMenuTree.on('click',function(node, ev){
			treeClick(node,ev);
       	});
		
		var viewport = new Ext.Viewport( {
			layout : "border",
			items : [ {
				region : "north",
				height : 67,
				contentEl: 'header'
			}, menuPanel, mainTab/*, {
				region : "south",
				height : 50,
				html : "this is the title"
			} */]
		});
	});

	function logout() {
		var rt = Ext.Msg.show( {
			buttons : Ext.Msg.YESNO,
			maxWidth : 200,
			minWidth : 300,
			msg : "<div style='margin: 5 5 8 15px;'>您确定退出本系统?</div>",
			title : "注销提示",
			icon : Ext.Msg.WARNING,
			fn : function(btn) {
				if ('yes' == btn) {
					window.location.href = sys.path
							+ "/j_spring_security_logout";
				}
			}
		});
	}
</script>

	<body>
		<div id="header">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
			   		<td width="664"><img src="<%=path %>/resources/images/local/title-a1.jpg" width="664" height="67" /></td>
			    	<td background="<%=path %>/resources/images/local/title-a2.jpg">&nbsp;</td>
			    	<td width="372"><img src="<%=path %>/resources/images/local/title-a3.jpg" width="372" height="67" /></td>
			  	</tr>
			</table>
		</div>
	
	</body>
</html>