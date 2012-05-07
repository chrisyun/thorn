/** ************************************************** */
/** *****************GRID PANEL*********************** */
/** ************************************************** */
function gridPanel(_isPage, _title, _height, _iconCls) {
	this.isPage = _isPage;
	this.title = _title || "数据列表";
	this.height = _height || Configuration.bodyHight -10;
	this.iconCls = _iconCls || "silk-grid";
}

/**
 * 初始化grid第一步
 * _url			:数据源URL
 * _sort		:是否支持后台排序，true为支持，默认不支持
 * _recordArray	:mapping数组{ name : 'dname', type : 'string', mapping : 'dname'}
 */
gridPanel.prototype.setDateStore = function(_url, _sort, _recordArray) {
	this.dataStore = new Ext.data.Store({
		url : _url,
		// 后台排序
		remoteSort : _sort || false,
		reader : new Ext.data.JsonReader( {
			totalProperty : "total",
			root : "reslutSet"
		},
		 Ext.data.Record.create([ _recordArray ]))
	});
}

gridPanel.prototype.setGridTbar = function(arrays) {
	this.tbar = arrays;
}

gridPanel.prototype.setGridBbar = function(_pageSize, arrays) {
	if(this.isPage) {
		this.pageSize = _pageSize || Configuration.defaultPageSize;
		var pagingToolBar = new Ext.PagingToolbar({
			store : this.dataStore,
			pageSize : this.pageSize,
			items : arrays,
			displayInfo : true,
			displayMsg : "当前显示{0}-{1}条,共{2}条",
			emptyMsg : "没有找到相关记录",
			emptyMsg : "没有找到相关记录",
			firstText : "第一页",
			prevText : "上一页",
			nextText : "下一页",
			lastText : "最后页",
			refreshText : "刷新",
			afterPageText : "页,共{0}页",
			beforePageText : "当前第"
		});
		this.bbar = pagingToolBar;
	} else {
		this.bbar = arrays;
	}
}

gridPanel.prototype.setColumnCheckBox = function() {
	this.sm = new Ext.grid.CheckboxSelectionModel({});
}

gridPanel.prototype.setColumnModel = function(array) {
	
	var model = new Array();
	model.push(new Ext.grid.RowNumberer({}));
	model.push(this.sm);
	
	for(var i=0;i<array.length;i++) {
		model.push(array[i]);
	}
	
	this.cm = new Ext.grid.ColumnModel(model);
}

gridPanel.prototype.setListeners = function(array) {
	this.listeners = array;
}

gridPanel.prototype.getGridPanel = function() {
	this.grid = new Ext.grid.GridPanel({
		height : this.height,
		title : this.title,
		collapsible : true,
		iconCls : this.iconCls,
		margins : "0 0 0 0",
		loadMask : true,
		store : this.dataStore,
		cm : this.cm,
		bbar : this.bbar,
		tbar : this.tbar,
		sm : this.sm,
		listeners : this.listeners,
		viewConfig : {
			forceFit : true
		}
	});
}