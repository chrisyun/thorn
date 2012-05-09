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
			var query_attr = {
				title : "查询列表",
				region : "north",
				height : 80,
				labelWidth : 80
			};
			var query_form_Cls = new FormPanel(query_attr);

			query_form_Cls.addItem(getPanelItem(getTxt("query_ename", "字典类型编码",
							120), 0.25, true));
			query_form_Cls.addItem(getPanelItem(getTxt("query_cname", "字典类型名称",
							120), 0.25, true));
			query_form_Cls.addItem(getPanelItem(
					getQueryBtn(onSubmitQueryHandler), 0.3, true));
			/** ****************query panel end*************** */

			/** ****************dtGrid panel start************ */
			var recordArray_dt = [
					getRecord("字典类型编号", "ename", "string", 70, true),
					getRecord("字典类型名称", "cname", "string", 100, true),
					getRecord("描述", "typeDesc", "string", 300)];
			var grid_dt_Cls = new Grid(dtListUrl, recordArray_dt, pageSize);

			var grid_dt_Bar = getCUDBar(dtSaveHandler, dtModifyHandler, dtDeleteHandler);
			grid_dt_Cls.setBottomBar(grid_dt_Bar);

			var listeners = {
				celldblclick : function(thisGrid, rowIndex, columnIndex, ev) {
					// alert("---");
				},
				cellclick : function(thisGrid, rowIndex, columnIndex, ev) {
					// alert("---");
				}
			};
			grid_dt_Cls.setListeners(listeners);

			var grid_dt_attr = {
				title : "字典类型列表",
				height : 200,
				region : "center"
			};
			grid_dt_Cls.setGridPanel(grid_dt_attr);
			/** ****************dtGrid panel end************ */

			/** ****************ddGrid panel start************ */
			var recordArray_dd = [getRecord("字典编码", "dname", "string", 70),
					getRecord("字典名称", "dvalue", "string", 100),
					getRecord("排序号", "sortNum", "string", 300),
					getRecord(null, "typeId", "string", null)];
			var grid_dd_Cls = new Grid(ddListUrl, recordArray_dd);

			var grid_dd_Bar = getCUDBar(null, null, ddDeleteHandler);
			grid_dd_Cls.setBottomBar(grid_dd_Bar);

			var grid_dd_attr = {
				title : "字典数据列表",
				height : 200,
				margins : "20 0 0 0",
				region : "south"
			};
			grid_dd_Cls.setGridPanel(grid_dd_attr);
			/** ****************ddGrid panel end************ */

			var grid_dt = grid_dt_Cls.grid;
			var grid_dd = grid_dd_Cls.grid

			/**
			 * 数据字典类型删除方法
			 */
			function dtDeleteHandler() {

				if (grid_dt.getSelectionModel().getCount() == 0) {
					Ext.Msg.alert("提示信息", "请至少选择一条记录!");
					return;
				}
				var selectedRecordArray = grid_dt.getSelectionModel()
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
											grid_dt.getStore().reload();
											grid_dd.getStore().removeAll();
										});
							}
						});
			}

			/**
			 * 数据字典项删除方法
			 */
			function ddDeleteHandler() {
				if (grid_dd.getSelectionModel().getCount() == 0) {
					Ext.Msg.alert("提示信息", "请至少选择一条记录!");
					return;
				}
				var selectedRecordArray = grid_dd.getSelectionModel()
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
											grid_dd.dataStore.reload();
										});
							}
						});
			}

			var dt_form_Cls = new FormPanel({
						id : "dtForm",
						collapsible : false,
						labelWidth : 100,
						border : false
					});

			dt_form_Cls.addItem(getPanelItem(getTxt("ename", "字典类型编码", 180),
					1.0, false));
			dt_form_Cls.addItem(getPanelItem(getTxt("cname", "字典类型名称", 180),
					1.0, false));
			dt_form_Cls.addItem(getPanelItem({
						id : "dtFormType",
						xtype : "hidden"
					}, 0, false));
			dt_form_Cls.addItem(getPanelItem({
						id : "typeDesc",
						fieldLabel : "描述",
						xtype : "textarea",
						width : 180,
						height : 60
					}, 1.0, false));

			var dt_win_Cls = new OpenWindow({
						width : 370,
						height : 220
					}, dt_form_Cls.form, dtSaveOrModify);

			function dtSaveHandler() {
				dt_win_Cls.show("新增数据字典类型");

				dt_form_Cls.form.getForm().reset();
				dt_form_Cls.form.findById("dtFormType")
						.setValue(Configuration.opType.save);
			}

			function dtModifyHandler() {
				if (grid_dt.getSelectionModel().getCount() != 1) {
					Ext.Msg.alert("提示信息", "请选择一条记录!");
					return;
				}

				var dtForm = dt_form_Cls.form;

				dt_win_Cls.show("修改数据字典类型");
				dtForm.getForm().reset();
				dtForm.findById("dtFormType")
						.setValue(Configuration.opType.modify);

				// 将主键置为不可编辑
				var dnameText = dtForm.findById("ename");
				dnameText.el.dom.readOnly = true;

				var selectedRecord = grid_dt.getSelectionModel().getSelected();
				var values = {
					ename : selectedRecord.get("ename"),
					cname : selectedRecord.get("cname"),
					typeDesc : selectedRecord.get("typeDesc")
				};
				dtForm.getForm().setValues(values);
			}

			function dtSaveOrModify() {
				alert("-");
			}

			/**
			 * 查询按钮提交方法
			 */
			function onSubmitQueryHandler() {
				var thisForm = query_form_Cls.form.getForm();
				var store = grid_dt.getStore();

				if (store.baseParams == null) {
					store.baseParams = {};
				}

				var cname = Ext.getCmp("query_cname").getValue();
				var ename = Ext.getCmp("query_ename").getValue();

				store.baseParams.ename = ename;
				store.baseParams.cname = cname;

				store.reload({
							params : {
								start : 0,
								limit : grid_dt_Cls.pageSize
							}
						});
			}

			var viewport = new Ext.Viewport({
						border : false,
						layout : "border",
						items : [query_form_Cls.form, grid_dt, grid_dd]
					});

			grid_dt.getStore().load({
						params : {
							"start" : 0,
							"limit" : grid_dt_Cls.pageSize
						}
					});

		});