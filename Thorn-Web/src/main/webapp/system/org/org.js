var orgPageUrl = "";
var orgSaveOrModifyUrl = "";
var orgDeleteUrl = "";
var pageSize = 20;

Ext.onReady(function() {
			Ext.QuickTips.init();

			/** ****************query panel start*************** */
			var query_attr = {
				title : "查询列表",
				region : "north",
				height : 80,
				labelWidth : 80
			};
			var query_form_Cls = new FormPanel(query_attr);

			query_form_Cls.addItem(getPanelItem(getTxt("query_code", "组织编码",
							120), 0.25, true));
			query_form_Cls.addItem(getPanelItem(getTxt("query_name", "组织名称",
							120), 0.25, true));
			query_form_Cls.addItem(getPanelItem(
					getQueryBtn(onSubmitQueryHandler), 0.3, true));
			/** ****************query panel end*************** */

			/** ****************org Grid panel start************ */
			var recordArray = [getRecord(null, "orgId", "string"),
					getRecord(null, "parentOrg", "string"),
					getRecord(null, "showName", "string"),
					getRecord(null, "orgCode", "string"),
					getRecord("组织编号", "orgCode", "string", 100, true),
					getRecord("组织名称", "orgName", "string", 150, true),
					getRecord("组织类型", "orgType", "string", 70, true),
					getRecord("组织邮箱", "orgMail", "string", 120),
					getRecord("所属区域", "area", "string", 70, true),
					getRecord("是否显示", "isShow", "string", 70, true),
					getRecord("是否禁用", "isDisabled", "string", 70, true)];
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

			var grid = grid_Cls.grid;
			var store = grid.getStore();

			orgTree.on("click", function(node) {
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
									handler : modifyHandler
								}, "-", {
									text : "删除组织",
									iconCls : "silk-delete",
									handler : deleteHandler
								}]
					});
			orgTree.on("contextmenu", function(node, ev) {
						ev.preventDefault();
						node.select();
						if (node.id == -1) {
							menuTop.showAt(ev.getXY());
						} else {
							menu.showAt(ev.getXY());
						}
					});
			orgTree.getRootNode().expand(false, false);

			function saveHandler() {

			}

			function modifyHandler() {

			}

			function deleteHandler() {
				if (grid.getSelectionModel().getCount() == 0) {
					Ext.Msg.alert("提示信息", "请至少选择一条记录!");
					return;
				}
				var selectedRecordArray = grid.getSelectionModel()
						.getSelections();

				Ext.Msg.confirm("确认提示", "确定删除选定的记录?", function(btn) {
							if (btn == "yes") {
								var ids = "";
								for (var i = 0; i < selectedRecordArray.length; i++) {
									ids += selectedRecordArray[i].get("orgId")
											+ ",";
								}

								var params = {
									ids : ids
								};

								var ajaxClass = new CommonAjax(orgDeleteUrl);
								ajaxClass.request(params, true, null, function(
												obj) {
											grid.getStore().reload();
										});
							}
						});
			}

			function onSubmitQueryHandler() {

			}

			var viewport = new Ext.Viewport({
						border : false,
						layout : "border",
						items : [orgTree, {
									border : false,
									region : "center",
									layout : "border",
									split : true,
									items : [query_form_Cls.form, grid_Cls.grid]
								}]
					});

		});
