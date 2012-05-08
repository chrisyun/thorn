function openWindow(winAttr, form, saveHandler) {
	this.openWin = new Ext.Window({
				title : '弹出窗口',
				closeAction : 'hide',
				modal : true,
				shadow : true,
				closable : true,
				layout : 'fit',
				width : 350,
				height : 210,
				items : [form],
				buttonAlign : "center",
				buttons : [{
							text : '保存',
							iconCls : 'silk-accept',
							handler : saveHandler
						}, {
							text : '关闭',
							iconCls : 'slik-close',
							scope : this,
							handler : function() {
								this.openWin.hide();
							}
						}]
			});
	for (var attr in winAttr) {
		this.openWin[attr] = winAttr[attr];
	}
}

openWindow.prototype.show = function() {
	this.openWin.show();
}