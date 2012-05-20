var getUserUrl = sys.basePath + "user/getUserPageByRole.jmt";
var getUserNotInRoleUrl = sys.basePath + "user/getUserPageNotInRole.jmt";
var getAllRoleUrl = sys.basePath + "role/getAllRole.jmt";

var pageSize = 20;
var currentActiveNode = tree_root;

Ext.onReady(function() {
	Ext.QuickTips.init();
	/** *******************query Panel start********************* */
	var query_attr = {
		title : "查询列表",
		region : "north",
		height : 80,
		labelWidth : 70
	};
	var query_form_Cls = new FormPanel(query_attr);

	query_form_Cls.addItem(getPanelItem(getTxt("query_code", "用户编号", 120),
			0.23, true));
	query_form_Cls.addItem(getPanelItem(getTxt("query_name", "用户姓名", 120),
			0.23, true));

	var role = {
		xtype : "combo",
		id : "roleCode_show",
		hiddenName : "roleCode",
		triggerAction : "all",
		resizable : true,
		lazyInit : true,
		mode : "remote",
		width : 120,
		fieldLabel : "角色列表",
		valueField : "roleCode",
		displayField : "roleName",
		store : new Ext.data.Store({
					url : getAllRoleUrl,
					reader : new Ext.data.JsonReader({}, Ext.data.Record
									.create([{
												name : 'roleCode',
												type : 'string'
											}, {
												name : 'roleName',
												type : 'string'
											}]))
				})
	};
	query_form_Cls.addItem(getPanelItem(role, 0.23, false));
	query_form_Cls.addItem(getPanelItem(getQueryBtn(onSubmitQueryHandler), 0.3,
			true));
	/** *******************query Panel end*********************** */

	/** *******************User Role Grid start********************* */
	var member_recordArray = [
			getRecord("用户编号", "userId", "string", 100, true),
			getRecord("用户名称", "userName", "string", 100, true),
			getRecord("邮箱", "cumail", "string", 120),
			getRecord("默认角色", "defaultRole", "string", 70, true,
					defaultRoleRender),
			getRecord("是否显示", "isShow", "string", 70, true, yesOrNoRender),
			getRecord("是否禁用", "isDisabled", "string", 70, true, yesOrNoRender)];
	var member_grid_Cls = new Grid(getUserUrl, member_recordArray, pageSize);
	member_grid_Cls.setBottomBar(null);

	member_grid_Cls.setGridPanel({
				title : "角色成员列表",
				region : "center"
			});
	
	var notIn_recordArray = [
			getRecord("用户编号", "userId", "string", 100, true),
			getRecord("用户名称", "userName", "string", 100, true),
			getRecord("邮箱", "cumail", "string", 120),
			getRecord("默认角色", "defaultRole", "string", 70, true,
					defaultRoleRender),
			getRecord("是否显示", "isShow", "string", 70, true, yesOrNoRender),
			getRecord("是否禁用", "isDisabled", "string", 70, true, yesOrNoRender)];		
	var notIn_grid_Cls = new Grid(getUserNotInRoleUrl, notIn_recordArray, pageSize);
	notIn_grid_Cls.setBottomBar(null);

	notIn_grid_Cls.setGridPanel({
				title : "非角色成员列表",
				region : "south"
			});		
			
	/** *******************User Role Grid end********************* */
	var member_grid = member_grid_Cls.getGridPanel();
	var member_store = member_grid_Cls.getStore();
	
	var notIn_grid = notIn_grid_Cls.getGridPanel();
	var notIn_store = notIn_grid_Cls.getStore();
	
	orgTree.on("click", function(node) {
				currentActiveNode = node;

				if (!thisForm.isValid()) {
					Ext.Msg.alert("提示信息", "请先选择角色!");
					return;
				}

				var roleCode = Ext.getCmp("roleCode_show").getValue();

				member_store.baseParams = {
					"roleCode" : roleCode,
					"orgCode" : node.attributes.pid
				};
				member_store.reload({
							params : {
								start : 0,
								limit : pageSize
							}
						});
						
				notIn_store.baseParams = {
					"roleCode" : roleCode,
					"orgCode" : node.attributes.pid
				};
				notIn_store.reload({
							params : {
								start : 0,
								limit : pageSize
							}
						});		
						
			});

	orgTree.getRootNode().expand(false, false);

	
	
	function onSubmitQueryHandler() {
		var thisForm = query_form_Cls.getForm();

		if (!thisForm.isValid()) {
			Ext.Msg.alert("提示信息", "请先选择角色!");
			return;
		}

		if (member_store.baseParams == null) {
			member_store.baseParams = {};
		}

		var name = Ext.getCmp("query_name").getValue();
		var code = Ext.getCmp("query_code").getValue();
		var roleCode = Ext.getCmp("roleCode_show").getValue();

		member_store.baseParams.userName = name;
		member_store.baseParams.userAccount = code;
		member_store.baseParams.roleCode = roleCode;

		member_store.reload({
					params : {
						start : 0,
						limit : member_grid_Cls.pageSize
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
						member_grid_Cls.getGridPanel()]
			}]
		});
	

});