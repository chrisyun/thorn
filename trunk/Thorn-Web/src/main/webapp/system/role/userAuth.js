var userRolePageUrl = sys.path + "/user/getUserPageByRole.jmt";
var userNotInRolePageUrl = sys.path + "/user/getUserPageNotInRole.jmt";
var userdeleteRoleUrl = sys.path + "/user/deleteUserRole.jmt";
var usersaveRoleUrl = sys.path + "/user/saveUserRole.jmt";

var getAllRoleUrl = sys.path + "/role/getAllRole.jmt";

var pageSize = 20;
var roleCode;

Ext
		.onReady(function() {
			Ext.QuickTips.init();
			/** *******************query Panel start********************* */
			var query_attr = {
				title : "查询列表",
				region : "north",
				height : 80,
				labelWidth : 70
			};
			var query_form = new FormUtil(query_attr);

			query_form.addComp(getText("query_code", "用户编号", 120), 0.23, true);
			query_form.addComp(getText("query_name", "用户姓名", 120), 0.23, true);

			var role = {
				xtype : "combo",
				id : "show_roleCode",
				hiddenName : "roleCode",
				triggerAction : "all",
				resizable : true,
				lazyInit : true,
				mode : "remote",
				width : 120,
				fieldLabel : "角色列表",
				valueField : "roleCode",
				displayField : "roleName",
				store : new Ext.data.Store( {
					url : getAllRoleUrl,
					reader : new Ext.data.JsonReader( {}, Ext.data.Record
							.create( [ {
								name : 'roleCode',
								type : 'string'
							}, {
								name : 'roleName',
								type : 'string'
							} ]))
				})
			};
			query_form.addComp(role, 0.23, false);
			query_form.addComp(getQueryBtn(onSubmitQueryHandler), 0.3, true);
			/** *******************query Panel end*********************** */

			/** *******************User Role Grid start********************* */
			var recordArray = [
					getRecord("用户编号", "userId", "string", 100, true),
					getRecord("姓名", "userName", "string", 100, true),
					getRecord("邮箱", "cumail", "string", 120),
					getRecord("默认角色", "defaultRole", "string", 70, true,
							defaultRoleRender),
					getRecord("是否显示", "isShow", "string", 70, true,
							yesOrNoRender),
					getRecord("是否禁用", "isDisabled", "string", 70, true,
							yesOrNoRender) ];
			var member_grid = new GridUtil(userRolePageUrl, recordArray, pageSize);
			member_grid.setBottomBar( {
				text : "角色删除用户",
				iconCls : "silk-delete",
				handler : removeUsersHandler
			});

			member_grid.setGridPanel( {
				title : "角色成员列表",
				region : "center"
			});

			var notIn_grid = new GridUtil(userNotInRolePageUrl, recordArray,
					pageSize);
			notIn_grid.setBottomBar( {
				text : "角色增加用户",
				iconCls : "silk-add",
				minWidth : Configuration.minBtnWidth,
				handler : saveUsersHandler
			});

			notIn_grid.setGridPanel( {
				title : "非角色成员列表",
				height : 200,
				region : "south"
			});

			/** *******************User Role Grid end********************* */
			var grid_member = member_grid.getGridPanel();
			var store_member = member_grid.getStore();

			var grid_notIn = notIn_grid.getGridPanel();
			var store_notIn = notIn_grid.getStore();

			/** *******************org Tree Grid start********************* */
			doStore = function(node) {
				var thisForm = query_form.getForm();

				if (!thisForm.isValid()) {
					Ext.Msg.alert("提示信息", "请先选择角色!");
					return;
				}

				var roleCode = Ext.getCmp("roleCode_show").getValue();

				member_store.baseParams = {
					"roleCode" : roleCode,
					"orgCode" : node.attributes.pid
				};
				member_store.reload( {
					params : {
						start : 0,
						limit : pageSize
					}
				});

				notIn_store.baseParams = {
					"roleCode" : roleCode,
					"orgCode" : node.attributes.pid
				};
				notIn_store.reload( {
					params : {
						start : 0,
						limit : pageSize
					}
				});
				notIn_store.removeAll();
			};
			/** *******************org Tree Grid end********************* */
			function onSubmitQueryHandler() {
				var thisForm = query_form.getForm();

				if (!thisForm.isValid()) {
					Ext.Msg.alert("提示信息", "请先选择角色!");
					return;
				}

				var name = Ext.getCmp("query_name").getValue();
				var code = Ext.getCmp("query_code").getValue();
				roleCode = Ext.getCmp("roleCode_show").getValue();

				member_store.baseParams.userName = name;
				member_store.baseParams.userAccount = code;
				member_store.baseParams.roleCode = roleCode;

				member_store.reload( {
					params : {
						start : 0,
						limit : member_grid.pageSize
					}
				});
			}

			function saveUsersHandler() {
				if (notIn_grid.getSelectionModel().getCount() == 0) {
					Ext.Msg.alert("提示信息", "请至少选择一条记录!");
					return;
				}

				if (Ext.isEmpty(roleCode)) {
					Ext.Msg.alert("提示信息", "未选中角色!");
					return;
				}

				var selectedRecordArray = notIn_grid.getSelectionModel()
						.getSelections();

				var ids = "";
				for ( var i = 0; i < selectedRecordArray.length; i++) {
					ids += selectedRecordArray[i].get("userId") + ",";
				}

				var params = {
					userIds : ids,
					roleCode : roleCode
				};

				var ajaxClass = new AjaxUtil(usersaveRoleUrl);
				ajaxClass.request(params, true, null, function(obj) {
					member_grid.getStore().reload();
					notIn_grid.getStore().reload();
				});
			}

			function removeUsersHandler() {
				if (member_grid.getSelectionModel().getCount() == 0) {
					Ext.Msg.alert("提示信息", "请至少选择一条记录!");
					return;
				}

				if (Ext.isEmpty(roleCode)) {
					Ext.Msg.alert("提示信息", "未选中角色!");
					return;
				}

				var selectedRecordArray = member_grid.getSelectionModel()
						.getSelections();

				Ext.Msg.confirm("确认提示", "确定删除选定的记录?", function(btn) {
					if (btn == "yes") {
						var ids = "";
						for ( var i = 0; i < selectedRecordArray.length; i++) {
							ids += selectedRecordArray[i].get("userId") + ",";
						}

						var params = {
							userIds : ids,
							roleCode : roleCode
						};

						var ajaxClass = new AjaxUtil(userdeleteRoleUrl);
						ajaxClass.request(params, true, null, function(obj) {
							member_grid.getStore().reload();
							notIn_grid.getStore().reload();
						});
					}
				});
			}

			var viewport = new Ext.Viewport(
					{
						border : false,
						layout : "border",
						items : [
								orgTree,
								{
									border : false,
									region : "center",
									layout : "border",
									split : true,
									items : [ query_form.getPanel(),
											member_grid.getGrid(),
											notIn_grid.getGrid() ]
								} ]
					});

		});