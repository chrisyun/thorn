var orgTreeUrl = sys.basePath + "org/orgTree.jmt";

var tree_loader = new Ext.tree.TreeLoader({
			url : orgTreeUrl
		});
tree_loader.on("beforeload", function(loader, node) {
			tree_loader.baseParams.pid = node.id;
		});

var orgTree = new Ext.tree.TreePanel({
			region : 'west',
			autoScroll : true,
			collapsible : true,
			margins : "2 0 0 0",
			width : 230,
			border : true,
			useArrows : true,
			rootVisible : true,
			split : true,
			loader : tree_loader,
			root : new Ext.tree.AsyncTreeNode({
						text : "组织树",
						id : "-1",
						iconCls : "tree-org",
						leaf : false
					})
		});