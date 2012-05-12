var orgTreeUrl = sys.basePath + "org/getOrgTree.jmt";

var tree_loader = new Ext.tree.TreeLoader({
			url : orgTreeUrl
		});
tree_loader.on("beforeload", function(loader, node) {
			tree_loader.baseParams.pid = node.attributes.pid;
		});

var tree_root = new Ext.tree.AsyncTreeNode({
			text : "组织树",
			id : "-1",
			iconCls : "tree-org",
			pid : "ROOT",
			leaf : false
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
			root : tree_root
		});

function getOrgTreeSelect(id, width, isReadonly) {

	var orgSel = new Object();
	
	orgSel.id = id + "_show";
	orgSel.hiddenName = id;
	orgSel.width = width;
	orgSel.fieldLabel = "所属组织";
	orgSel.readOnly = isReadonly;

	orgSel.xtype = "treefield";
	orgSel.valueField = "attributes.pid";
	orgSel.displayField = "text";
	orgSel.editable = false;
	orgSel.border = false;
	orgSel.listHeight = 200;
	
	orgSel.tree = new Ext.tree.TreePanel({
				border : false,
				rootVisible : true,
				autoHeight : true,
				useArrows : true,
				containerScroll : true,
				id : "org-tree",
				loader : tree_loader,
				root : new Ext.tree.AsyncTreeNode({
							text : "组织树",
							id : "-1",
							iconCls : "tree-org",
							pid : "ROOT",
							leaf : false
						})
			});

	return orgSel;

}