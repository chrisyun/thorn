var dtListUrl = sys.basePath + "dd/getDtPage.jmt";
var dtSubmitUrl = sys.basePath + "dd/saveOrModifyDt.jmt";
var dtDeleteUrl = sys.basePath + "dd/deleteDt.jmt";

var ddListUrl = sys.basePath + "dd/searchDdList.jmt";
var ddSubmitUrl = sys.basePath + "dd/submitDictData.jmt";
var ddDeleteUrl = sys.basePath + "dd/deleteDictData.jmt";

Ext.onReady(function() {
	Ext.QuickTips.init();
	
	//title、height、labelWidth
	var queryPanelObj = new queryFromPanel(null, 100, 80);
	
	//id,name,xtype,labelName,columnWidth,width,default,notEmpty
	var ename = itemPanel("ename","ename",null,"字典类型编码",0.3,120,null,false);
	queryPanelObj.addItem(ename);
	var cname = itemPanel("cname","cname",null,"字典类型名称",0.3,120,null,false);
	queryPanelObj.addItem(cname);
	
	var queryBtn = new button("queryBtn","查询","slik-search",80,onSubmitQueryHandler);
	queryPanelObj.addButton(queryBtn);
	
	var dtGrid = new gridPanel(true,"字典类型列表",200,null);
	var recordArray = [ {
		name : "ename",
		type : "string",
		mapping : "ename"
	}, {
		name : "cname",
		type : "string",
		mapping : "cname"
	}, {
		name : "creattime",
		type : "string",
		mapping : "creattime"
	} ];
	dtGrid.setDateStore(dtListUrl,true,recordArray);
	
	var gridBtn = [ '-', {
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
	} ];
	dtGrid.setGridBbar(10,gridBtn);
	
	dtGrid.setColumnCheckBox();
	var columnModle = [{
		header : "字典类型编号",
		dataIndex : "ename",
		sortable : true,
		id : "ename",
		width : 70
	}, {
		header : "字典类型名称",
		dataIndex : "cname",
		sortable : true,
		id : "cname",
		width : 100
	}, {
		header : "描述",
		dataIndex : "typeDesc",
		sortable : false,
		id : "typeDesc",
		width : 300
	}];
	dtGrid.setColumnModel(columnModle);
	
	dtGrid.getGridPanel();
	
	dtGrid.grid.region = "center";
	
//	var listeners = {celldblclick : function(thisGrid, rowIndex, columnIndex, ev) {
//						alert("---");
//					 },
//					 cellclick : function(thisGrid, rowIndex, columnIndex, ev) {
//						alert("---");
//					 }};
//	dtGrid.setListeners(listeners);
	

	/**
	 *查询按钮提交方法	
	 */
	function onSubmitQueryHandler() {
		var thisForm = queryPanelObj.queryPanel.getForm();
		var store = dtGrid.grid.getStore();

		if (store.baseParams == null) {
			store.baseParams = {};
		}

		var cname = Ext.getCmp("cname").getValue();
		var ename = Ext.getCmp("ename").getValue();

		store.baseParams.ename = ename;
		store.baseParams.cname = cname;

		store.reload( {
			params : {
				start : 0,
				limit : dtGrid.pageSize
			}
		});
	}

	var viewport = new Ext.Viewport( {
		border : false,
		layout : "border",
		items : [ queryPanelObj.queryPanel, dtGrid.grid ]
	});

	dtGrid.grid.getStore().load( {
		params : {
			"start" : 0,
			"limit" : dtGrid.pageSize
		}
	});

});