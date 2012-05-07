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
	
	this.component = new Ext.Component({
		id : _id,
		name : _name || _id,
		fieldLabel : _labelName,
		xtype : _xtype || "textfield",
		width : _width || 140,
		allowBlank : allow,
		blankText : Configuration.msg.EMPTY
	});
	
	this.panel = new Ext.Panel({
		columnWidth : _columnWidth || 0.5,
		defaults : _defaults,
		items : [this.component]
	});
	
	return this.panel;
}