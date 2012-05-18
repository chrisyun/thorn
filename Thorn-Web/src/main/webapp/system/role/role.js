var rolePageUrl = sys.basePath + "role/getRolePage.jmt";
var roleSaveOrModifyUrl = sys.basePath + "role/saveOrModify.jmt";
var roleDeleteUrl = sys.basePath + "role/delete.jmt";

var pageSize = 20;

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

	query_form_Cls.addItem(getPanelItem(getTxt("query_code", "角色编码", 120),
			0.23, true));
	query_form_Cls.addItem(getPanelItem(getTxt("query_name", "角色名称", 120),
			0.23, true));
	query_form_Cls.addItem(getPanelItem(getQueryBtn(onSubmitQueryHandler), 0.3,
			true));
	/** ****************query panel end*************** */

	/** ****************role Grid panel start************ */
	var remarkRender = function(remark, metadata, record, rowIndex, colIndex) {
		return Render.detailRender(remark, grid_Cls.cm, colIndex);
	};

	var recordArray = [getRecord("角色编码", "roleCode", "string", 70, true),
			getRecord("角色名称", "roleName", "string", 100, true),
			getRecord("是否禁用", "isDisabled", "string", 70, true, yesOrNoRender),
			getRecord("描述", "roleDesc", "string", 300, false, remarkRender)];
	var grid_Cls = new Grid(rolePageUrl, recordArray, pageSize);

	var grid_Bar = getCUDBar(saveHandler, modifyHandler, deleteHandler);
	grid_Cls.setBottomBar(grid_Bar);

	var listeners = {
		celldblclick : function(thisGrid, rowIndex, columnIndex, ev) {
			modifyHandler();
		}
	};
	grid_Cls.setListeners(listeners);

	var grid_attr = {
		title : "角色列表",
		region : "center"
	};
	grid_Cls.setGridPanel(grid_attr);
	/** ****************role Grid panel end************ */
	var grid = grid_Cls.getGridPanel();
	var store = grid_Cls.getStore();
	/** ****************org window start************ */
	var role_form_Cls = new FormPanel({
				id : "roleForm",
				collapsible : false,
				labelWidth : 80,
				border : false
			});
	role_form_Cls.addItem(getPanelItem(getTxt("roleCode", "角色编码", 180), 1.0,
			false));

	role_form_Cls.addItem(getPanelItem(getTxt("roleName", "角色名称", 180), 1.0,
			false));

	role_form_Cls.addItem(getPanelItem(getTxtarea("roleDesc", "描述", 180, 60),
			1.0, true));

	role_form_Cls.addItem(getPanelItem(getSelect("isDisabled", "是否禁用", 180,
					yesOrNo, false), 1.0, false));

	role_form_Cls.addItem(getPanelItem({
				id : "opType",
				xtype : "hidden"
			}, 0, true));

	var role_win_Cls = new OpenWindow({
				width : 330,
				height : 250
			}, role_form_Cls.getFormPanel(), saveOrModify);

	/** ****************org window start************ */

	function saveHandler() {
		role_win_Cls.show("新增角色");

		role_form_Cls.getForm().reset();
		role_form_Cls.getFormPanel().findById("opType")
				.setValue(Configuration.opType.save);
	}

	function modifyHandler() {
		if (grid.getSelectionModel().getCount() != 1) {
			Ext.Msg.alert("提示信息", "请选择一条记录!");
			return;
		}

		role_win_Cls.show("修改角色");
		var form = role_form_Cls.getFormPanel();

		role_form_Cls.getForm().reset();

		// 将主键置为不可编辑
		var codeText = form.findById("roleCode");
		codeText.el.dom.readOnly = true;

		var selectedRecord = grid.getSelectionModel().getSelected();
		var values = {
			roleCode : selectedRecord.get("roleCode"),
			roleName : selectedRecord.get("roleName"),
			roleDesc : selectedRecord.get("roleDesc"),
			isDisabled : selectedRecord.get("isDisabled"),
			opType : Configuration.opType.modify
		};
		form.getForm().setValues(values);
	}

	function saveOrModify() {
		var form = role_form_Cls.getForm();

		if (!form.isValid()) {
			Ext.Msg.alert("提示信息", "请填写完整的角色信息!");
			return;
		}

		var ajaxClass = new CommonAjax(roleSaveOrModifyUrl);

		var callBack_obj = new Object();
		callBack_obj.grid = grid;
		callBack_obj.win = role_win_Cls;
		callBack_obj.form = role_form_Cls;

		ajaxClass.submitForm(form, null, true, callBack_obj, function(obj) {
					obj.grid.getStore().reload();
					var thisForm = obj.form.getFormPanel();
					var opType = thisForm.findById("opType").getValue();

					if (opType == Configuration.opType.save) {
						obj.form.getForm().reset();
						thisForm.findById("opType").setValue(opType);
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
							ids += selectedRecordArray[i].get("roleCode") + ",";
						}

						var params = {
							ids : ids
						};

						var ajaxClass = new CommonAjax(roleDeleteUrl);
						ajaxClass.request(params, true, null, function(obj) {
									grid.getStore().reload();
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

		store.baseParams.roleName = name;
		store.baseParams.roleCode = code;

		store.reload({
					params : {
						start : 0,
						limit : grid_Cls.pageSize
					}
				});
	}

	/** **********************Auth panel*********************** */

	var authTab = new Ext.TabPanel({
				region : 'east',
				activeTab : 0,
				margins : '2 0 2 0',
				resizeTabs : true,
				border : false,
				minTabWidth : 80,
				items : [sysMenuTree, navMenuTree]
			});

	var loader = new Ext.tree.TreeLoader({
				url : sys.basePath + "/resource/getSourceTree.jmt",
				uiProviders : {
					"checkBox" : Ext.ux.TreeCheckNodeUI
				}
			});

	var sysMenuTree = new Ext.tree.TreePanel({
				border : false,
				useArrows : true,
				rootVisible : false,
				loader : loader,
				root : new Ext.tree.AsyncTreeNode({
							text : "系统管理",
							id : 'SYS',
							expanded : true,
							uiProvider : Ext.ux.TreeCheckNodeUI,
							leaf : false
						})
			});

	var navMenuTree = new Ext.tree.TreePanel({
				border : false,
				useArrows : true,
				rootVisible : false,
				loader : loader,
				root : new Ext.tree.AsyncTreeNode({
							text : "导航菜单",
							id : 'NAV',
							expanded : true,
							uiProvider : Ext.ux.TreeCheckNodeUI,
							leaf : false
						})
			});

	var viewport = new Ext.Viewport({
				border : false,
				layout : "border",
				items : [query_form_Cls.getFormPanel(), grid_Cls.getGridPanel(), authTab]
			});

	grid.getStore().reload({
				params : {
					start : 0,
					limit : grid_Cls.pageSize
				}
			});

});
