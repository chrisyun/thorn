function openWindow(fromAttr, winAttr, saveHandler) {
	this.form = new Ext.FormPanel({
				bodyStyle : 'padding-top: 30px',
				labelAlign : 'right',
				labelWidth : 100,
				defaults : {
					xtype : "textfield",
					width : 180,
					allowBlank : false,
					blankText : Common.config.msgNull
				},
				items : [{}]
			});
	
	for (var attr in fromAttr) {
		this.form[attr] = fromAttr[attr];
	}		
	
	this.openWin = new Ext.Window({
				title : '弹出窗口',
				closeAction : 'hide',
				modal : true,
				shadow : true,
				closable : true,
				layout : 'fit',
				width : 350,
				height : 210,
				items : [this.form],
				buttonAlign : "center",
				buttons : [{
							text : '保存',
							iconCls : 'silk-accept',
							handler : saveHandler
						}, {
							text : '关闭',
							iconCls : 'slik-close',
							handler : function() {
								this.openWin.hide();
							}
						}]
			});
	for (var attr in winAttr) {
		this.openWin[attr] = winAttr[attr];
	}
}

queryFromPanel.prototype.addItem = function(itemPanel) {
	this.form.add(itemPanel);
}
