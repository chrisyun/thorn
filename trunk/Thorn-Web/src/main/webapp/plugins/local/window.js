function OpenWindow(winAttr, form, saveHandler) {
	this.openWin = new Ext.Window({
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
							scope : this,
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

OpenWindow.prototype.show = function(title) {
	this.openWin.setTitle(title);
	this.openWin.show();
}

OpenWindow.prototype.hide = function() {
	this.openWin.hide();
}

OpenWindow.prototype.getWindow = function() {
	return this.openWin;
}