var dtListUrl = sys.basePath + "dd/getDtPage.jmt";
var dtSubmitUrl = sys.basePath + "dd/saveOrModifyDt.jmt";
var dtDeleteUrl = sys.basePath + "dd/deleteDt.jmt";

var ddListUrl = sys.basePath + "dd/searchDdList.jmt";
var ddSubmitUrl = sys.basePath + "dd/submitDictData.jmt";
var ddDeleteUrl = sys.basePath + "dd/deleteDictData.jmt";
var pageSize = 10;

Ext.onReady(function() {
			Ext.QuickTips.init();

			/** ****************query panel start*************** */
			var queryAttr = {
				region : "north",
				height : 80,
				labelWidth : 80
			};
			var queryPanelObj = new queryFromPanel(queryAttr);

			var ename = getItemPanel({
						id : "ename",
						fieldLabel : "字典类型编码",
						xtype : "textfield",
						width : 120
					}, 0.2, true);
			queryPanelObj.addItem(ename);
			var cname = getItemPanel({
						id : "cname",
						fieldLabel : "字典类型名称",
						xtype : "textfield",
						width : 120
					}, 0.2, true);
			queryPanelObj.addItem(cname);
			var queryBtn = getItemPanel({
						id : "queryBtn",
						iconCls : "slik-search",
						text : "查询",
						xtype : "button",
						minWidth : 80,
						handler : onSubmitQueryHandler
					}, 0.3, true);
			queryPanelObj.addItem(queryBtn);
			/** ****************query panel end*************** */

			/** ****************dtGrid panel start************ */
			var dtRecordArray = [{
						header : "字典类型编号",
						id : "ename",
						type : "string",
						width : 70,
						sortable : true
					}, {
						header : "字典类型名称",
						id : "cname",
						type : "string",
						width : 100,
						sortable : true
					}, {
						header : "描述",
						id : "typeDesc",
						type : "string",
						width : 300,
						sortable : false
					}];
			var dtGridObj = new gridPanel(dtListUrl, dtRecordArray, pageSize);

			var dtGridBbar = ['-', {
						text : "增加",
						iconCls : "silk-add",
						minWidth : Configuration.minBtnWidth
					}, '-', {
						text : "修改",
						iconCls : "silk-edit",
						minWidth : Configuration.minBtnWidth
					}, '-', {
						text : "删除",
						iconCls : "silk-delete",
						minWidth : Configuration.minBtnWidth,
						handler : onDtDeleteHandler
					}];
			dtGridObj.setBottomBar(dtGridBbar);

			var listeners = {
				celldblclick : function(thisGrid, rowIndex, columnIndex, ev) {
					// alert("---");
				},
				cellclick : function(thisGrid, rowIndex, columnIndex, ev) {
					// alert("---");
				}
			};
			dtGridObj.setListeners(listeners);

			var dtGridAttr = {
				title : "字典类型列表",
				height : 200,
				region : "center"
			};
			dtGridObj.setGridPanel(dtGridAttr);
			/** ****************dtGrid panel end************ */

			/** ****************ddGrid panel start************ */
			var ddRecordArray = [{
						header : "字典编码",
						id : "dname",
						type : "string",
						width : 70,
						sortable : false
					}, {
						header : "字典名称",
						id : "dvalue",
						type : "string",
						width : 100,
						sortable : false
					}, {
						header : "排序号",
						id : "sortNum",
						type : "string",
						width : 300,
						sortable : false
					}, {
						id : "typeId",
						type : "string"
					}];
			var ddGridObj = new gridPanel(ddListUrl, ddRecordArray);

			var ddGridBbar = ['-', {
						text : "增加",
						iconCls : "silk-add",
						minWidth : Configuration.minBtnWidth
					}, '-', {
						text : "修改",
						iconCls : "silk-edit",
						minWidth : Configuration.minBtnWidth
					}, '-', {
						text : "删除",
						iconCls : "silk-delete",
						minWidth : Configuration.minBtnWidth,
						handler : onDdDeleteHandler
					}];
			ddGridObj.setBottomBar(ddGridBbar);

			var ddGridAttr = {
				title : "字典数据列表",
				height : 250,
				margins : "20 0 0 0",
				region : "south"
			};
			ddGridObj.setGridPanel(ddGridAttr);
			/** ****************ddGrid panel end************ */

			var dtgrid = dtGridObj.grid;
			var ddgrid = ddGridObj.grid

			var viewport = new Ext.Viewport({
						border : false,
						layout : "border",
						items : [queryPanelObj.queryPanel, dtgrid, ddgrid]
					});

			dtgrid.getStore().load({
						params : {
							"start" : 0,
							"limit" : dtGridObj.pageSize
						}
					});

			/**
			 * 数据字典类型删除方法
			 */
			function onDtDeleteHandler() {

				if (dtgrid.getSelectionModel().getCount() == 0) {
					Ext.Msg.alert("提示信息", "请至少选择一条记录!");
					return;
				}
				var selectedRecordArray = dtgrid.getSelectionModel()
						.getSelections();

				Ext.Msg.confirm("确认提示", "确定删除选定的记录?", function(btn) {
							if (btn == 'yes') {
								var ids = "";
								for (var i = 0; i < selectedRecordArray.length; i++) {
									ids += selectedRecordArray[i].get("ename")
											+ ",";
								}

								var params = {
									ids : ids
								};

								var ajaxClass = new CommonAjax(dtDeleteUrl);
								ajaxClass.request(params, true, null, function(
												obj) {
											dtgrid.getStore().reload();
											ddgrid.getStore().removeAll();
										});
							}
						});
			}

			/**
			 * 数据字典项删除方法
			 */
			function onDdDeleteHandler() {
				if (ddgrid.getSelectionModel().getCount() == 0) {
					Ext.Msg.alert("提示信息", "请至少选择一条记录!");
					return;
				}
				var selectedRecordArray = ddgrid.getSelectionModel()
						.getSelections();

				Ext.Msg.confirm("确认提示", "确定删除选定的记录?", function(btn) {
							if (btn == 'yes') {
								var ids = "";
								for (var i = 0; i < selectedRecordArray.length; i++) {
									ids += selectedRecordArray[i].get("dname")
											+ ",";
								}

								var typeId = selectedRecordArray[0]
										.get("typeId");
								alert(typeId);

								var params = {
									ids : ids,
									typeid : typeId
								};

								var ajaxClass = new CommonAjax(ddDeleteUrl);
								ajaxClass.request(params, true, null, function(
												obj) {
											ddgrid.dataStore.reload();
										});
							}
						});
			}

			/**
			 * 查询按钮提交方法
			 */
			function onSubmitQueryHandler() {
				var thisForm = queryPanelObj.queryPanel.getForm();
				var store = dtgrid.getStore();

				if (store.baseParams == null) {
					store.baseParams = {};
				}

				var cname = Ext.getCmp("cname").getValue();
				var ename = Ext.getCmp("ename").getValue();

				store.baseParams.ename = ename;
				store.baseParams.cname = cname;

				store.reload({
							params : {
								start : 0,
								limit : dtGridObj.pageSize
							}
						});
			}

		});