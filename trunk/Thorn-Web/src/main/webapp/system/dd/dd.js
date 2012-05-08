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
						minWidth : Configuration.minBtnWidth
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
						id : "sortNum",
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
						minWidth : Configuration.minBtnWidth
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

			/**
			 * 查询按钮提交方法
			 */
			function onSubmitQueryHandler() {
				var thisForm = queryPanelObj.queryPanel.getForm();
				var store = dtGridObj.grid.getStore();

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

			var viewport = new Ext.Viewport({
						border : false,
						layout : "border",
						items : [queryPanelObj.queryPanel, dtGridObj.grid,
								ddGridObj.grid]
					});

			dtGridObj.grid.getStore().load({
						params : {
							"start" : 0,
							"limit" : dtGridObj.pageSize
						}
					});

		});