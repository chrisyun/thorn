function FormPanel(attrObj) {

	this.form = new Ext.FormPanel({
				iconCls : "icon-grid",
				bodyStyle : "padding-top: 7px;",
				collapsible : true,
				height : Configuration.bodyHight - 10,
				margins : "2 0 0 0",
				layout : "column",
				split : true,
				labelWidth : 100,
				labelAlign : "right",
				buttonAlign : "center",
				defaults : {
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

FormPanel.prototype.getFormPanel = function() {
	return this.form;
}

FormPanel.prototype.getForm = function() {
	return this.form.getForm();
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
		attrObj.fieldLabel = Validate.redStar + attrObj.fieldLabel;
		attrObj.allowBlank = empty;
		attrObj.blankText = Validate.empty;
	}

	var panel = ({
		columnWidth : columnWidth || 0.5,
		bodyStyle : "padding-top: 4px;",
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

function getNumberTxt(id, text, width) {
	var txt = getTxt(id,text,width);
	
	txt.vtype = "number";
	txt.vtypeText = Validate.number;
	return txt;
}

function getMailTxt(id, text, width) {
	var txt = getTxt(id,text,width);
	
	txt.vtype = "email";
	txt.vtypeText = Validate.email;
	return txt;
}

function getSelect(id, text, width, array, isReadonly) {
	var select = new Object();
	
	select.id = id + "_show";
	select.hiddenName = id;
	select.width = width;
	select.fieldLabel = text;
	select.readOnly = isReadonly

	select.xtype = "combo";
	select.valueField = "value";
	select.displayField = "text";
	select.mode = "local";
	select.editable = false;
	select.triggerAction = "all";
	select.resizable = true;
	select.emptyText = "---请选择---";
	select.value = "";
	select.store = new Ext.data.SimpleStore({
				fields : ['value', 'text'],
				data : array
			})

	return select;
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
