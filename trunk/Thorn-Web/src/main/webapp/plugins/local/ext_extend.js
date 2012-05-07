function queryFromPanel(_title, _height, _labelWidth) {
	
	var title = _title || "查询条件";
	var height = _height || Configuration.bodyHight - 10;
	var labelWidth = _labelWidth || 100;
	
	this.queryPanel = new Ext.FormPanel( {
			title : title,
			iconCls : "icon-grid",
			region : "north",
			bodyStyle : "padding-top: 7px;",
			collapsible : true,
			height : height,
			margins : "2 0 2 0",
			layout : "column",
			//border : false,
			id : "queryFormPanel",
			split : true,
			labelWidth : labelWidth,
			labelAlign : "right",
			defaults : {
				bodyStyle : "padding-left: 30px;",
				xtype : "panel",
				border : false,
				layout : "form"
			},
			items : [{}],
			buttons:[]
	} );
}

queryFromPanel.prototype.addButton = function(btn) {
	this.queryPanel.buttons.push(btn);
}

queryFromPanel.prototype.addItem = function(itemPanel) {
	this.queryPanel.items.add(itemPanel);
}

/**
 * _id		:	控件id
 * _text	：	按钮文字
 * _iconCls	：	按钮图标样式
 * _width	：	按钮宽度
 * _handler	：	按钮点击方法
 */
function button(_id, _text, _iconCls, _width, _handler) {
	
	this.btn = new new Ext.Button({
		id : _id,
		text : _text,
		iconCls : _iconCls,
		minWidth : _width || Configuration.btnWidth,
		handler : _handler
	});
	
	return this.btn;
}

/**
 * _id			:控件id
 * _name		:控件name
 * _xtype		:
 * _labelName	:
 * _columnWidth	:默认0.5
 * _width		:默认140
 * _defaults	:其他属性
 * notEmpty		:可否为空，true表示不能为空
 */
function itemPanel(_id, _name, _xtype, _labelName, _columnWidth, _width, _defaults, notEmpty) {
	
	var allow = true;
	if(notEmpty) {
		allow = false;
		_labelName = Configuration.redStar + _labelName;
	}
	
	this.panel = new Ext.Panel({
		columnWidth : _columnWidth || 0.5,
		defaults : _defaults,
		items : [{
			id : _id,
			name : _name || _id,
			fieldLabel : _labelName,
			xtype : _xtype || "textfield",
			width : _width || 140,
			allowBlank : allow,
			blankText : Configuration.msg.EMPTY
		}]
	});
	
	return this.panel;
}


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
		this.pagingToolBar = new Ext.PagingToolbar({
			store : this.dataStore,
			pageSize : _pageSize || Configuration.defaultPageSize,
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
