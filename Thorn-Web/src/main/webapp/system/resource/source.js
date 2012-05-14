var sourcePageUrl = sys.basePath + "resource/getSourcePage.jmt";
var sourceSaveOrModifyUrl = sys.basePath + "resource/saveOrModify.jmt";
var sourceDeleteUrl = sys.basePath + "resource/delete.jmt";
var sourceTreeUrl = sys.basePath + "/resource/getLeftTree.jmt";
var pageSize = 20;
var currentActiveNode;

Ext.onReady(function() {
	Ext.QuickTips.init();

	/** ****************query panel start*************** */
	var query_attr = {
		title : "查询列表",
		region : "north",
		height : 80,
		labelWidth : 70
	};
	var query_form_Cls = new FormPanel(query_attr);

	query_form_Cls.addItem(getPanelItem(getTxt("query_code", "资源编码", 120),
			0.23, true));
	query_form_Cls.addItem(getPanelItem(getTxt("query_name", "资源名称", 120),
			0.23, true));
	query_form_Cls.addItem(getPanelItem(getQueryBtn(onSubmitQueryHandler), 0.3,
			true));
	/** ****************query panel end*************** */

	/** ****************Grid panel start************ */
	var recordArray = [getRecord(null, "sortNum", "string"),
			getRecord(null, "parentSource", "string"),
			getRecord("资源编号", "sourceCode", "string", 100, true),
			getRecord("资源名称", "sourceName", "string", 150, false),
			getRecord("是否叶子节点", "isleaf", "string", 70, true, yesOrNoRender),
			getRecord("图标样式", "iconsCls", "string", 70, false, iconClsRender),
			getRecord("是否显示", "isShow", "string", 70, true, yesOrNoRender),
			getRecord("菜单访问入口", "sourceUrl", "string", 200, false)];
	var grid_Cls = new Grid(sourcePageUrl, recordArray, pageSize);

	var grid_Bar = getCUDBar(null, modifyHandler, deleteHandler);
	grid_Cls.setBottomBar(grid_Bar);

	var listeners = {
		celldblclick : function(thisGrid, rowIndex, columnIndex, ev) {
			modifyHandler();
		}
	};
	grid_Cls.setListeners(listeners);

	var grid_attr = {
		title : "资源列表",
		region : "center"
	};
	grid_Cls.setGridPanel(grid_attr);
	/** ****************Grid panel end************ */

	/** ****************tree panel start************ */
	var loader = new Ext.tree.TreeLoader({
				url : sourceTreeUrl
			});
	loader.on("beforeload", function(loader, node) {
				loader.baseParams.pid = node.id;
			});

	var tree = new Ext.tree.TreePanel({
				region : 'west',
				autoScroll : true,
				collapsible : true,
				margins : "2 0 0 0",
				width : 230,
				border : true,
				useArrows : true,
				rootVisible : true,
				split : true,
				loader : loader,
				root : new Ext.tree.AsyncTreeNode({
							text : "资源树",
							id : "0",
							leaf : false
						})
			});

	tree.on("click", function(node) {
				currentActiveNode = node;
				store.baseParams = {
					"pid" : node.id
				};
				store.reload({
							params : {
								start : 0,
								limit : pageSize
							}
						});
			});

	var menu = new Ext.menu.Menu({
				items : [{
							text : "增加子资源",
							iconCls : "silk-add",
							handler : saveHandler
						}]
			});
	tree.on("contextmenu", function(node, ev) {
				ev.preventDefault();
				node.select();
				currentActiveNode = node;
				menu.showAt(ev.getXY());
			});
	tree.getRootNode().expand(false, false);
	/** ****************tree panel start************ */

	var grid = grid_Cls.getGridPanel();
	var store = grid_Cls.getStore();

	/** ****************org window start************ */
	var source_form_Cls = new FormPanel({
				id : "sourceForm",
				collapsible : false,
				labelWidth : 100,
				border : false
			});
	source_form_Cls.addItem(getPanelItem(getTxt("sourceCode", "资源编号", 150),
			0.5, false));

	source_form_Cls.addItem(getPanelItem(getTxt("sourceName", "资源名称", 150),
			0.5, false));

	source_form_Cls.addItem(getPanelItem(getTxt("sourceUrl", "菜单访问入口", 150),
			0.5, true));

	source_form_Cls.addItem(getPanelItem(getSelect("iconsCls", "菜单图标", 150,
					iconCls, false), 0.5, true));

	source_form_Cls.addItem(getPanelItem(getSelect("isShow", "是否显示", 150,
					yesOrNo, false), 0.5, false));

	source_form_Cls.addItem(getPanelItem(getSelect("isleaf", "是否叶子节点", 150,
					yesOrNo, false), 0.5, false));

	var sortTxt = getNumberTxt("sortNum", "排序号", 150);
	source_form_Cls.addItem(getPanelItem(sortTxt, 0.5, true));

	source_form_Cls.addItem(getPanelItem({
				id : "opType",
				xtype : "hidden"
			}, 0, true));
	source_form_Cls.addItem(getPanelItem({
				id : "parentSource",
				xtype : "hidden"
			}, 0, true));

	var source_win_Cls = new OpenWindow({
				width : 560,
				height : 220
			}, source_form_Cls.getFormPanel(), saveOrModify);

	/** ****************org window start************ */

	function saveHandler() {
		var pid = currentActiveNode.id;

		source_win_Cls.show("新增资源");

		source_form_Cls.getForm().reset();
		source_form_Cls.getFormPanel().findById("opType")
				.setValue(Configuration.opType.save);
		source_form_Cls.getFormPanel().findById("parentSource").setValue(pid);

	}

	function modifyHandler() {
		if (grid.getSelectionModel().getCount() != 1) {
			Ext.Msg.alert("提示信息", "请选择一条记录!");
			return;
		}

		source_win_Cls.show("修改资源");
		var form = source_form_Cls.getFormPanel();

		source_form_Cls.getForm().reset();

		// 将主键置为不可编辑
		var codeText = form.findById("sourceCode");
		codeText.el.dom.readOnly = true;

		var selectedRecord = grid.getSelectionModel().getSelected();
		var values = {
			sourceCode : selectedRecord.get("sourceCode"),
			sourceName : selectedRecord.get("sourceName"),
			isleaf : selectedRecord.get("isleaf"),
			iconsCls : selectedRecord.get("iconsCls"),
			sourceUrl : selectedRecord.get("sourceUrl"),
			parentSource : selectedRecord.get("parentSource"),
			isShow : selectedRecord.get("isShow"),
			sortNum : selectedRecord.get("sortNum"),
			opType : Configuration.opType.modify
		};
		form.getForm().setValues(values);
	}

	function saveOrModify() {
		var form = source_form_Cls.getForm();

		if (!form.isValid()) {
			Ext.Msg.alert("提示信息", "请填写完整的资源信息!");
			return;
		}

		var ajaxClass = new CommonAjax(sourceSaveOrModifyUrl);

		var callBack_obj = new Object();
		callBack_obj.grid = grid;
		callBack_obj.win = source_win_Cls;
		callBack_obj.form = source_form_Cls;

		ajaxClass.submitForm(form, null, true, callBack_obj, function(obj) {
					obj.grid.getStore().reload();
					var thisForm = obj.form.getFormPanel();
					var opType = thisForm.findById("opType").getValue();
					var pid = thisForm.findById("parentSource").getValue();

					if (currentActiveNode != null
							&& currentActiveNode.parentNode != null) {
						var refreshNode = currentActiveNode.parentNode;
						tree.getLoader().load(refreshNode);
						refreshNode.expand();
					} else {
						tree.getLoader().load(tree.getRootNode());
						tree.getRootNode().expand();
					}

					if (opType == Configuration.opType.save) {
						obj.form.getForm().reset();
						thisForm.findById("opType").setValue(opType);
						thisForm.findById("parentSource").setValue(pid);
					} else {
						obj.win.hide();
					}
				});
	}

	function deleteHandler() {
		if (grid.getSelectionModel().getCount() == 0) {
			Ext.Msg.alert("提示信息", "请至少选择一条记录!");
			return;
		}
		var selectedRecordArray = grid.getSelectionModel().getSelections();

		Ext.Msg.confirm("确认提示", "确定删除选定的记录?", function(btn) {
					if (btn == "yes") {
						var ids = "";
						for (var i = 0; i < selectedRecordArray.length; i++) {
							ids += selectedRecordArray[i].get("sourceCode")
									+ ",";
						}

						var params = {
							ids : ids
						};

						var ajaxClass = new CommonAjax(sourceDeleteUrl);
						ajaxClass.request(params, true, null, function(obj) {
									grid.getStore().reload();
									tree.getLoader().load(currentActiveNode);
									currentActiveNode.expand();
								});
					}
				});
	}

	function onSubmitQueryHandler() {
		var thisForm = query_form_Cls.getForm();
		var store = grid.getStore();

		if (store.baseParams == null) {
			store.baseParams = {};
		}

		var name = Ext.getCmp("query_name").getValue();
		var code = Ext.getCmp("query_code").getValue();

		store.baseParams.sourceCode = code;
		store.baseParams.sourceName = name;

		store.reload({
					params : {
						start : 0,
						limit : grid_Cls.pageSize
					}
				});
	}

	var viewport = new Ext.Viewport({
				border : false,
				layout : "border",
				items : [tree, {
					border : false,
					region : "center",
					layout : "border",
					split : true,
					items : [query_form_Cls.getFormPanel(),
							grid_Cls.getGridPanel()]
				}]
			});

	grid.getStore().reload({
				params : {
					pid : "0",
					start : 0,
					limit : grid_Cls.pageSize
				}
			});

});
