var orgPageUrl = sys.basePath + "org/getOrgPage.jmt";
var orgSaveOrModifyUrl = sys.basePath + "org/saveOrModify.jmt";
var orgDeleteUrl = sys.basePath + "org/delete.jmt";
var orgQuerUrl = sys.basePath + "org/getOrg.jmt";
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

	query_form_Cls.addItem(getPanelItem(getTxt("query_code", "组织编码", 120),
			0.23, true));
	query_form_Cls.addItem(getPanelItem(getTxt("query_name", "组织名称", 120),
			0.23, true));
	query_form_Cls.addItem(getPanelItem(getSelect("query_type", "组织类型", 120,
					orgType, false), 0.23, true));
	query_form_Cls.addItem(getPanelItem(getQueryBtn(onSubmitQueryHandler), 0.3,
			true));
	/** ****************query panel end*************** */

	/** ****************org Grid panel start************ */
	var recordArray = [getRecord(null, "orgId", "string"),
			getRecord(null, "parentOrg", "string"),
			getRecord(null, "orgName", "string"),
			getRecord(null, "orgCode", "string"),
			getRecord(null, "sortNum", "string"),
			getRecord("组织编号", "orgCode", "string", 100, true),
			getRecord("组织名称", "showName", "string", 150, true),
			getRecord("组织类型", "orgType", "string", 70, true, orgTypeRender),
			getRecord("组织邮箱", "orgMail", "string", 120),
			getRecord("所属区域", "area", "string", 70, true, areaRender),
			getRecord("是否显示", "isShow", "string", 70, true, yesOrNoRender),
			getRecord("是否禁用", "isDisabled", "string", 70, true, yesOrNoRender)];
	var grid_Cls = new Grid(orgPageUrl, recordArray, pageSize);

	var grid_Bar = getCUDBar(saveHandler, modifyHandler, deleteHandler);
	grid_Cls.setBottomBar(grid_Bar);

	var listeners = {
		celldblclick : function(thisGrid, rowIndex, columnIndex, ev) {
			modifyHandler();
		}
	};
	grid_Cls.setListeners(listeners);

	var grid_attr = {
		title : "组织列表",
		region : "center"
	};
	grid_Cls.setGridPanel(grid_attr);
	/** ****************org Grid panel end************ */

	var grid = grid_Cls.getGridPanel();
	var store = grid_Cls.getStore();

	orgTree.on("click", function(node) {
				currentActiveNode = node;
				store.baseParams = {
					"pid" : node.attributes.pid
				};
				store.reload({
							params : {
								start : 0,
								limit : pageSize
							}
						});
			});

	var menuTop = new Ext.menu.Menu({
				items : [{
							text : "增加子组织",
							iconCls : "silk-add",
							handler : saveHandler
						}]
			});
	var menu = new Ext.menu.Menu({
				items : [{
							text : "增加子组织",
							iconCls : "silk-add",
							handler : saveHandler
						}, "-", {
							text : "修改组织",
							iconCls : "silk-edit",
							handler : modifyMenuHandler
						}, "-", {
							text : "删除组织",
							iconCls : "silk-delete",
							handler : deleteMenuHandler
						}]
			});
	orgTree.on("contextmenu", function(node, ev) {
				ev.preventDefault();
				node.select();
				currentActiveNode = node;
				if (node.id == -1) {
					menuTop.showAt(ev.getXY());
				} else {
					menu.showAt(ev.getXY());
				}
			});
	orgTree.getRootNode().expand(false, false);

	/** ****************org window start************ */
	var org_form_Cls = new FormPanel({
				id : "orgForm",
				collapsible : false,
				labelWidth : 100,
				border : false
			});
	org_form_Cls.addItem(getPanelItem(getTxt("orgName", "组织名称", 150), 0.5,
			false));

	org_form_Cls.addItem(getPanelItem(getTxt("orgCode", "组织编码", 150), 0.5,
			false));

	org_form_Cls.addItem(getPanelItem(getTxt("showName", "组织显示名称", 150), 0.5,
			false));

	org_form_Cls.addItem(getPanelItem(getSelect("orgType", "组织类型", 150,
					orgType, false), 0.5, false));

	org_form_Cls.addItem(getPanelItem(getMailTxt("orgMail", "组织邮箱", 150), 0.5,
			true));

	org_form_Cls.addItem(getPanelItem(
			getOrgTreeSelect("parentOrg", 150, false), 0.5, false));

	org_form_Cls.addItem(getPanelItem(getSelect("isShow", "是否显示", 150, yesOrNo,
					false), 0.5, false));

	org_form_Cls.addItem(getPanelItem(getSelect("isDisabled", "是否禁用", 150,
					yesOrNo, false), 0.5, false));

	org_form_Cls.addItem(getPanelItem(getSelect("area", "所属区域", 150, area,
					false), 0.5, true));

	var sortTxt = getNumberTxt("sortNum", "排序号", 150);
	org_form_Cls.addItem(getPanelItem(sortTxt, 0.5, true));

	org_form_Cls.addItem(getPanelItem({
				id : "opType",
				xtype : "hidden"
			}, 0, true));
	org_form_Cls.addItem(getPanelItem({
				id : "orgId",
				value : 0,
				xtype : "hidden"
			}, 0, true));

	var org_win_Cls = new OpenWindow({
				width : 600,
				height : 300
			}, org_form_Cls.getFormPanel(), saveOrModify);

	/** ****************org window start************ */

	function saveHandler() {
		org_win_Cls.show("新增组织");

		org_form_Cls.getForm().reset();
		org_form_Cls.getFormPanel().findById("opType")
				.setValue(Configuration.opType.save);

		Ext.getCmp("parentOrg_show").setValue(currentActiveNode);
		
		// 自动将上级区域信息传递给下级组织？
		// 将所属组织设置为不可选
		// var parentOrgSel =
		// org_form_Cls.getFormPanel().findById("isDisabled_show");
		// parentOrgSel.el.dom.readOnly = true;
	}

	function modifyHandler() {
		if (grid.getSelectionModel().getCount() != 1) {
			Ext.Msg.alert("提示信息", "请选择一条记录!");
			return;
		}

		org_win_Cls.show("修改组织");
		var form = org_form_Cls.getFormPanel();

		org_form_Cls.getForm().reset();

		// 将主键置为不可编辑
		// var codeText = form.findById("orgCode");
		// codeText.el.dom.readOnly = true;

		var selectedRecord = grid.getSelectionModel().getSelected();
		var parentOrg = selectedRecord.get("parentOrg");
		var values = {
			orgId : selectedRecord.get("orgId"),
			orgName : selectedRecord.get("orgName"),
			orgCode : selectedRecord.get("orgCode"),
			showName : selectedRecord.get("showName"),
			orgType : selectedRecord.get("orgType"),
			orgMail : selectedRecord.get("orgMail"),
			isShow : selectedRecord.get("isShow"),
			isDisabled : selectedRecord.get("isDisabled"),
			area : selectedRecord.get("area"),
			sortNum : selectedRecord.get("sortNum"),
			opType : Configuration.opType.modify
		};
		form.getForm().setValues(values);

		// 获取所属组织名称
		if (!Ext.isEmpty(parentOrg)) {
			var ajax = new CommonAjax(orgQuerUrl);

			ajax.requestData({
						orgCode : parentOrg
					}, form, function(obj, data) {
						var orgName = data.orgName;
						var parentOrgNode = {
							text : orgName,
							attributes : {
								pid : parentOrg
							}
						};
						Ext.getCmp("parentOrg_show").setValue(parentOrgNode);
					});
		}
	}

	function saveOrModify() {
		var form = org_form_Cls.getForm();

		if (!form.isValid()) {
			Ext.Msg.alert("提示信息", "请填写完整的组织信息!");
			return;
		}

		var ajaxClass = new CommonAjax(orgSaveOrModifyUrl);

		var callBack_obj = new Object();
		callBack_obj.grid = grid;
		callBack_obj.win = org_win_Cls;
		callBack_obj.form = org_form_Cls;

		ajaxClass.submitForm(form, null, true, callBack_obj, function(obj) {
					obj.grid.getStore().reload();
					var thisForm = obj.form.getFormPanel();
					var opType = thisForm.findById("opType").getValue();

					if (currentActiveNode != null && currentActiveNode.parentNode != null) {
						var refreshNode = currentActiveNode.parentNode;
						orgTree.getLoader().load(refreshNode);
						refreshNode.expand();
					} else {
						orgTree.getLoader().load(tree_root);
						tree_root.expand();
					}

					if (opType == Configuration.opType.save) {
						obj.form.getForm().reset();
						thisForm.findById("opType").setValue(opType);
						Ext.getCmp("parentOrg_show")
								.setValue(currentActiveNode);
					} else {
						obj.win.hide();
					}
				});
	}

	function modifyMenuHandler() {
		org_win_Cls.show("修改组织");
		var form = org_form_Cls.getFormPanel();

		org_form_Cls.getForm().reset();

		var parentNode = currentActiveNode.parentNode;

		var orgId = currentActiveNode.id;

		var ajax = new CommonAjax(orgQuerUrl);

		ajax.requestData({
					orgId : orgId
				}, form, function(obj, data) {
					var values = {
						orgId : data.orgId,
						orgName : data.orgName,
						orgCode : data.orgCode,
						showName : data.showName,
						orgType : data.orgType,
						orgMail : data.orgMail,
						isShow : data.isShow,
						isDisabled : data.isDisabled,
						area : data.area,
						sortNum : data.sortNum,
						opType : Configuration.opType.modify
					};
					form.getForm().setValues(values);
					Ext.getCmp("parentOrg_show").setValue(parentNode);
				});
	}

	function deleteMenuHandler() {
		Ext.Msg.confirm("确认提示", "确定删除选定的记录?", function(btn) {
					if (btn == "yes") {
						var ids = currentActiveNode.id + ",";

						var params = {
							ids : ids
						};

						var ajaxClass = new CommonAjax(orgDeleteUrl);
						ajaxClass.request(params, true, null, function(obj) {
									grid.getStore().reload();
									var refreshNode = currentActiveNode.parentNode;
									orgTree.getLoader().load(refreshNode);
									refreshNode.expand();
								});
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
							ids += selectedRecordArray[i].get("orgId") + ",";
						}

						var params = {
							ids : ids
						};

						var ajaxClass = new CommonAjax(orgDeleteUrl);
						ajaxClass.request(params, true, null, function(obj) {
									grid.getStore().reload();
									orgTree.getLoader().load(currentActiveNode);
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
		var type = Ext.getCmp("query_type_show").getValue();

		store.baseParams.orgCode = code;
		store.baseParams.orgName = name;
		store.baseParams.orgType = type;

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
				items : [orgTree, {
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
					start : 0,
					limit : grid_Cls.pageSize
				}
			});

});
