/** ************************************************** */
/** *****************GRID PANEL*********************** */
/** ************************************************** */
function gridPanel(_isPage, _title, _height, _iconCls) {
	this.isPage = _isPage;
	
	this.grid = new Ext.grid.GridPanel({
		height : _height || Configuration.bodyHight -10,
		title : _title || "数据列表",
		collapsible : true,
		iconCls : _iconCls || "silk-grid",
		margins : "0 0 2 0",
		loadMask : true,
		viewConfig : {
			forceFit : true
		}
	});
}

/**
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
	this.grid.store = this.dataStore;
}

gridPanel.prototype.setGridTools = function(arrays) {
	this.grid.tools = arrays;
}

gridPanel.prototype.setGridBbar = function(_pageSize, _items) {
	if(this.isPage) {
		this.pageSize = _pageSize || Configuration.defaultPageSize;
		this.pagingToolBar = new Ext.PagingToolbar({
			store : this.dataStore,
			pageSize : this.pageSize,
			items : _items,
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
		this.grid.bbar = this.pagingToolBar;
	}
}

gridPanel.prototype.setColumnCheckBox = function() {
	this.grid.sm = new Ext.grid.CheckboxSelectionModel({});
}

gridPanel.prototype.setColumnModel = function(array) {
	
	this.columnModel = new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer({}), this.grid.sm, array]);
	
	this.grid.cm = this.columnModel;
}

gridPanel.prototype.setListeners = function(array) {
	this.grid.listeners = array;
}