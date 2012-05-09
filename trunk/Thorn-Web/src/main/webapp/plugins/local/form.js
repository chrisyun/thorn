function FormPanel(attrObj) {

	this.form = new Ext.FormPanel({
				iconCls : "icon-grid",
				bodyStyle : "padding-top: 7px;",
				collapsible : true,
				height : Configuration.bodyHight - 10,
				margins : "2 0 2 0",
				layout : "column",
				split : true,
				labelWidth : 100,
				labelAlign : "right",
				buttonAlign : "center",
				defaults : {
					bodyStyle : "padding-left: 8px;",
					xtype : "panel",
					border : false,
					layout : "form"
				},
				items : [{}]
			});

	for (var attr in attrObj) {
		this.form[attr] = attrObj[attr];
	}
}

FormPanel.prototype.addButton = function(btn) {
	this.form.buttons.push(btn);
}

FormPanel.prototype.addItem = function(itemPanel) {
	this.form.add(itemPanel);
}

/**
 * 生成button控件
 * 
 * @param {}
 *            attrObj
 * @return {}
 */
function getButton(attrObj) {

	var btn = new Ext.Button();

	for (var attr in attrObj) {
		btn[attr] = attrObj[attr];
	}

	return btn;
}

/**
 * 生成frompanel的控件元素panel
 * 
 * @param {}
 *            attrObj 控件属性
 * @param {}
 *            columnWidth
 * @param {}
 *            empty true表示不作空值检查
 * @return {}
 */
function getPanelItem(attrObj, columnWidth, empty) {

	if (!empty) {
		attrObj.fieldLabel = Configuration.redStar + attrObj.fieldLabel;
		attrObj.allowBlank = empty;
		attrObj.blankText = Configuration.msg.EMPTY;
	}

	var panel = ({
		columnWidth : columnWidth || 0.5,
		items : [attrObj]
	});

	return panel;
}

function getTxt(id, text, width) {
	var txt = new Object();

	txt.id = id;
	txt.width = width;
	txt.fieldLabel = text;
	txt.xtype = "textfield";

	return txt;
}

function getQueryBtn(queryHandler) {
	var queryBtn = new Object();

	queryBtn.id = "queryBtn";
	queryBtn.iconCls = "slik-search";
	queryBtn.text = "查询";
	queryBtn.xtype = "button";
	queryBtn.minWidth = 80;
	queryBtn.handler = queryHandler;
	
	return queryBtn
}
