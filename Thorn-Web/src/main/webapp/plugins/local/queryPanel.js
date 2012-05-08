function queryFromPanel(attrObj) {

	this.queryPanel = new Ext.FormPanel({
				title : "查询条件",
				iconCls : "icon-grid",
				bodyStyle : "padding-top: 7px;",
				collapsible : true,
				height : Configuration.bodyHight - 10,
				margins : "2 0 2 0",
				layout : "column",
				id : "queryFormPanel",
				split : true,
				labelWidth : 100,
				labelAlign : "right",
				buttonAlign : "center",
				defaults : {
					bodyStyle : "padding-left: 30px;",
					xtype : "panel",
					border : false,
					layout : "form"
				},
				items : [{}],
				buttons : []
			});

	for (var attr in attrObj) {
		this.queryPanel[attr] = attrObj[attr];
	}
}

queryFromPanel.prototype.addButton = function(btn) {
	this.queryPanel.buttons.push(btn);
}

queryFromPanel.prototype.addItem = function(itemPanel) {
	this.queryPanel.add(itemPanel);
}

/**
 * 生成button控件
 * @param {} attrObj
 * @return {}
 */
function getButton(attrObj) {

	this.btn = new Ext.Button();

	for (var attr in attrObj) {
		this.btn[attr] = attrObj[attr];
	}

	return this.btn;
}

/**
 * 生成frompanel的控件元素panel
 * @param {} attrObj		控件属性
 * @param {} columnWidth	
 * @param {} empty			true表示不作空值检查
 * @return {}
 */
function getItemPanel(attrObj, columnWidth, empty) {

	if (!empty) {
		attrObj.fieldLabel = Configuration.redStar + attrObj.fieldLabel;
		attrObj.allowBlank = empty;
		attrObj.blankText = Configuration.msg.EMPTY;
	}

	this.panel = ({
		columnWidth : columnWidth || 0.5,
		items : [attrObj]
	});

	return this.panel;
}