var userPageUrl = sys.basePath + "user/getOrgPage.jmt";
var userSaveOrModifyUrl = sys.basePath + "user/saveOrModify.jmt";
var userDeleteUrl = sys.basePath + "user/delete.jmt";
var userQuerUrl = sys.basePath + "user/getOrg.jmt";
var pageSize = 20;
var currentActiveNode = tree_root;

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

	query_form_Cls.addItem(getPanelItem(getTxt("query_code", "用户编号", 120),
			0.23, true));
	query_form_Cls.addItem(getPanelItem(getTxt("query_name", "用户名称", 120),
			0.23, true));
	query_form_Cls.addItem(getPanelItem(getTxt("query_mail", "用户邮箱", 120),
			0.23, true));
	query_form_Cls.addItem(getPanelItem(getQueryBtn(onSubmitQueryHandler), 0.3,
			true));
	/** ****************query panel end*************** */

	/** ****************user Grid panel start************ */
	var recordArray = [
			getRecord(null, "orgName", "string"),
			getRecord(null, "orgCode", "string"),
			getRecord(null, "sortNum", "string"),
			getRecord(null, "userAccount", "string"),
			getRecord(null, "sn", "string"),
			getRecord("用户编号", "userId", "string", 100, true),
			getRecord("用户名称", "userName", "string", 150, true),
			getRecord("性别", "gender", "string", 70, true, genderRender),
			getRecord("邮箱", "cumail", "string", 120),
			getRecord("电话", "phone", "string", 70, true),
			getRecord("默认角色", "defaultRole", "string", 70, true,
					defaultRoleRender),
			getRecord("是否显示", "isShow", "string", 70, true, yesOrNoRender),
			getRecord("是否禁用", "isDisabled", "string", 70, true, yesOrNoRender)];
	var grid_Cls = new Grid(userPageUrl, recordArray, pageSize);

	var grid_Bar = getCUDBar();
	grid_Cls.setBottomBar(grid_Bar);

	var listeners = {
		celldblclick : function(thisGrid, rowIndex, columnIndex, ev) {
			modifyHandler();
		}
	};
	grid_Cls.setListeners(listeners);

	var grid_attr = {
		title : "用户列表",
		region : "center"
	};
	grid_Cls.setGridPanel(grid_attr);
	/** ****************user Grid panel end************ */

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

	var menu = new Ext.menu.Menu({
				items : [{
							text : "增加用户",
							iconCls : "silk-add",
							handler : saveHandler
						}]
			});

	orgTree.on("contextmenu", function(node, ev) {
				ev.preventDefault();
				node.select();
				currentActiveNode = node;
				menu.showAt(ev.getXY());
			});
	orgTree.getRootNode().expand(false, false);

	/** ****************org window start************ */
	var user_form_Cls = new FormPanel({
				id : "userForm",
				collapsible : false,
				labelWidth : 100,
				border : false
			});
	user_form_Cls.addItem(getPanelItem(getTxt("userId", "用户编号", 150), 0.5,
			false));

	user_form_Cls.addItem(getPanelItem(getTxt("sn", "姓", 150), 0.5, true));

	user_form_Cls.addItem(getPanelItem(getTxt("userAccount", "账号", 150), 0.5,
			false));

	user_form_Cls.addItem(getPanelItem(getTxt("userName", "姓名", 150), 0.5,
			false));

	user_form_Cls.addItem(getPanelItem(getSelect("gender", "性别", 150, gender,
					false), 0.5, true));

	user_form_Cls.addItem(getPanelItem(getTxt("phone", "电话", 150), 0.5, false));

	user_form_Cls.addItem(getPanelItem(getMailTxt("cumail", "邮箱", 150), 0.5,
			true));

	user_form_Cls.addItem(getPanelItem(getOrgTreeSelect("orgCode", 150, false),
			0.5, false));

	user_form_Cls.addItem(getPanelItem(getSelect("defaultRole", "默认角色", 150,
					defaultRole, false), 0.5, true));

	user_form_Cls.addItem(getPanelItem(getSelect("isShow", "是否显示", 150,
					yesOrNo, false), 0.5, false));

	user_form_Cls.addItem(getPanelItem(getSelect("isDisabled", "是否禁用", 150,
					yesOrNo, false), 0.5, false));

	var sortTxt = getNumberTxt("sortNum", "排序号", 150);
	user_form_Cls.addItem(getPanelItem(sortTxt, 0.5, true));

	user_form_Cls.addItem(getPanelItem({
				id : "opType",
				xtype : "hidden"
			}, 0, true));

	var user_win_Cls = new OpenWindow({
				width : 600,
				height : 300
			}, user_form_Cls.getFormPanel(), saveOrModify);

	/** ****************org window start************ */

	function saveHandler() {
		user_win_Cls.show("新增用户");

		user_form_Cls.getForm().reset();
		user_form_Cls.getFormPanel().findById("opType")
				.setValue(Configuration.opType.save);

		Ext.getCmp("orgCode_show").setValue(currentActiveNode);

		// 自动将上级区域信息传递给下级组织？
		// 将所属组织设置为不可选
		// var parentOrgSel =
		// user_form_Cls.getFormPanel().findById("isDisabled_show");
		// parentOrgSel.el.dom.readOnly = true;
	}

	function modifyHandler() {
		if (grid.getSelectionModel().getCount() != 1) {
			Ext.Msg.alert("提示信息", "请选择一条记录!");
			return;
		}

		user_win_Cls.show("修改用户");
		var form = user_form_Cls.getFormPanel();

		user_form_Cls.getForm().reset();

		// 将主键置为不可编辑
		var codeText = form.findById("userId");
		codeText.el.dom.readOnly = true;

		var selectedRecord = grid.getSelectionModel().getSelected();
		var orgCode = selectedRecord.get("orgCode");
		var orgName = selectedRecord.get("orgName");
		var values = {
			userId : selectedRecord.get("userId"),
			userName : selectedRecord.get("userName"),
			userAccount : selectedRecord.get("userAccount"),
			sn : selectedRecord.get("sn"),
			gender : selectedRecord.get("gender"),
			cumail : selectedRecord.get("cumail"),
			phone : selectedRecord.get("phone"),
			defaultRole : selectedRecord.get("defaultRole"),
			isShow : selectedRecord.get("isShow"),
			isDisabled : selectedRecord.get("isDisabled"),
			sortNum : selectedRecord.get("sortNum"),
			opType : Configuration.opType.modify
		};
		form.getForm().setValues(values);

		var orgNode = {
			text : orgName,
			attributes : {
				pid : orgCode
			}
		};
		Ext.getCmp("orgCode_show").setValue(parentOrgNode);
	}

	function saveOrModify() {
		var form = user_form_Cls.getForm();

		if (!form.isValid()) {
			Ext.Msg.alert("提示信息", "请填写完整的用户信息!");
			return;
		}

		var ajaxClass = new CommonAjax(userSaveOrModifyUrl);

		var callBack_obj = new Object();
		callBack_obj.grid = grid;
		callBack_obj.win = user_win_Cls;
		callBack_obj.form = user_form_Cls;

		ajaxClass.submitForm(form, null, true, callBack_obj, function(obj) {
					obj.grid.getStore().reload();
					var thisForm = obj.form.getFormPanel();
					var opType = thisForm.findById("opType").getValue();

					if (opType == Configuration.opType.save) {
						obj.form.getForm().reset();
						thisForm.findById("opType").setValue(opType);
						Ext.getCmp("orgCode_show")
								.setValue(currentActiveNode);
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
							ids += selectedRecordArray[i].get("userId") + ",";
						}

						var params = {
							ids : ids
						};

						var ajaxClass = new CommonAjax(userDeleteUrl);
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
					limit : grid_Cls.pageSize,
					pid : "ROOT"
				}
			});

});