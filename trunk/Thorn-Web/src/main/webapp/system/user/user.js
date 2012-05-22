var userPageUrl = sys.basePath + "user/getUserPage.jmt";
var userSaveOrModifyUrl = sys.basePath + "user/saveOrModify.jmt";
var userDeleteUrl = sys.basePath + "user/delete.jmt";
var userDisabledUrl = sys.basePath + "user/disabled.jmt";

var getAllRoleUrl = sys.basePath + "role/getAllRole.jmt";
var getUserRoleUrl = sys.basePath + "role/getUserRole.jmt";

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
			getRecord("用户名称", "userName", "string", 100, true),
			getRecord("性别", "gender", "string", 70, true, genderRender),
			getRecord("邮箱", "cumail", "string", 120),
			getRecord("电话", "phone", "string", 70),
			getRecord("默认角色", "defaultRole", "string", 70, true,
					defaultRoleRender),
			getRecord("是否显示", "isShow", "string", 70, true, yesOrNoRender),
			getRecord("是否禁用", "isDisabled", "string", 70, true, yesOrNoRender)];
	var grid_Cls = new Grid(userPageUrl, recordArray, pageSize);

	var grid_Bar = getCUDBar();
	grid_Cls.setBottomBar(grid_Bar);

	var top_Bar = ["-", {
				text : "修改",
				iconCls : "silk-edit",
				minWidth : Configuration.minBtnWidth,
				handler : modifyHandler
			}, "-", {
				text : "删除",
				iconCls : "silk-delete",
				minWidth : Configuration.minBtnWidth,
				handler : deleteHandler
			}, "-", {
				text : "启用",
				iconCls : "silk-tick",
				minWidth : Configuration.minBtnWidth,
				handler : unDisabledHandler
			}, "-", {
				text : "禁用",
				iconCls : "silk-cross",
				minWidth : Configuration.minBtnWidth,
				handler : disabledHandler
			}, "-", {
				text : "修改密码",
				iconCls : "tree-pwd",
				minWidth : Configuration.minBtnWidth,
				handler : pwdHandler
			}, "-", {
				text : "用户授权",
				iconCls : "tree-pwd",
				minWidth : Configuration.minBtnWidth,
				handler : roleHandler
			}];
	grid_Cls.setTopBar(top_Bar);

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
					"orgCode" : node.attributes.pid
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

	user_form_Cls.addItem(getPanelItem(getSelect("defaultRole", "默认角色", 150,
					defaultRole, false), 0.5, false));

	user_form_Cls.addItem(getPanelItem(getMailTxt("cumail", "邮箱", 150), 0.5,
			false));

	user_form_Cls.addItem(getPanelItem(getOrgTreeSelect("orgCode", 150, false),
			0.5, false));

	user_form_Cls.addItem(getPanelItem(getTxt("phone", "电话", 150), 0.5, true));

	user_form_Cls.addItem(getPanelItem(getPwdTxt("userPwd", "密码", 150), 0.5,
			true));

	user_form_Cls.addItem(getPanelItem(getSelect("isShow", "是否显示", 150,
					yesOrNo, false), 0.5, false));

	user_form_Cls.addItem(getPanelItem(getRPwdTxt("userrPwd", "重复密码", 150,
					"userPwd"), 0.5, true));

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

	/** *****************org window start************ */

	/** *****************role window start************ */

	function roleHandler() {
		role_win_Cls.show("用户授权");
	}

	var role_form_Cls = new FormPanel({
				id : "roleForm",
				collapsible : false,
				labelWidth : 100,
				border : false
			});
	var role_cbGroup = {
		xtype: 'checkboxgroup',
		width : 300,
		columns : 3,
        fieldLabel: 'Auto Layout',
        items: [
            {boxLabel: 'Item 1', name: 'cb-auto-1'},
            {boxLabel: 'Item 2', name: 'cb-auto-2', checked: true},
            {boxLabel: 'Item 3', name: 'cb-auto-3'},
            {boxLabel: 'Item 4', name: 'cb-auto-4'},
            {boxLabel: 'Item 5', name: 'cb-auto-5'}
        ]
	}		
	role_form_Cls.addItem(getPanelItem(role_cbGroup), 1.0, true);		
	
	var role_win_Cls = new OpenWindow({
				width : 600,
				height : 300
			}, role_form_Cls.getFormPanel(), saveOrModify);
	

	/** *****************role window end************ */
	function saveHandler() {
		user_win_Cls.show("新增用户");

		user_form_Cls.getForm().reset();
		user_form_Cls.getFormPanel().findById("opType")
				.setValue(Configuration.opType.save);

		Ext.getCmp("orgCode_show").setValue(currentActiveNode);
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
		Ext.getCmp("orgCode_show").setValue(orgNode);
	}

	function saveOrModify() {
		var form = user_form_Cls.getForm();

		var newpwd = form.findField("userPwd");
		var newpwdconfirmCmp = form.findField("userrPwd");
		if (newpwd.getValue() != newpwdconfirmCmp.getValue()) {
			newpwdconfirmCmp.markInvalid(Validate.rpwd);
			return;
		}

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
						Ext.getCmp("orgCode_show").setValue(currentActiveNode);
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

	function unDisabledHandler() {
		if (grid.getSelectionModel().getCount() == 0) {
			Ext.Msg.alert("提示信息", "请至少选择一条记录!");
			return;
		}
		var selectedRecordArray = grid.getSelectionModel().getSelections();

		var ids = "";
		for (var i = 0; i < selectedRecordArray.length; i++) {
			ids += selectedRecordArray[i].get("userId") + ",";
		}

		var params = {
			ids : ids,
			isDisabled : Configuration.yOrN.no
		};

		var ajaxClass = new CommonAjax(userDisabledUrl);
		ajaxClass.request(params, true, null, function(obj) {
					grid.getStore().reload();
				});

	}

	function disabledHandler() {
		if (grid.getSelectionModel().getCount() == 0) {
			Ext.Msg.alert("提示信息", "请至少选择一条记录!");
			return;
		}
		var selectedRecordArray = grid.getSelectionModel().getSelections();

		Ext.Msg.confirm("确认提示", "确定禁用选定的用户?", function(btn) {
					if (btn == "yes") {
						var ids = "";
						for (var i = 0; i < selectedRecordArray.length; i++) {
							ids += selectedRecordArray[i].get("userId") + ",";
						}

						var params = {
							ids : ids,
							isDisabled : Configuration.yOrN.yes
						};

						var ajaxClass = new CommonAjax(userDisabledUrl);
						ajaxClass.request(params, true, null, function(obj) {
									grid.getStore().reload();
								});
					}
				});

	}

	var Pwd_Obj = new UserPwd();
	function pwdHandler() {
		if (grid.getSelectionModel().getCount() != 1) {
			Ext.Msg.alert("提示信息", "请选择一名用户!");
			return;
		}
		var selectedRecord = grid.getSelectionModel().getSelected();
		var user_id = selectedRecord.get("userId");
		Pwd_Obj.show(user_id);
	}

	function onSubmitQueryHandler() {
		var thisForm = query_form_Cls.getForm();
		var store = grid.getStore();

		if (store.baseParams == null) {
			store.baseParams = {};
		}

		var name = Ext.getCmp("query_name").getValue();
		var code = Ext.getCmp("query_code").getValue();
		var mail = Ext.getCmp("query_mail").getValue();

		store.baseParams.userName = name;
		store.baseParams.userAccount = code;
		store.baseParams.cumail = mail;

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
					orgCode : "ROOT"
				}
			});

});
