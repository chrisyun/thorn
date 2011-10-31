var Common = {
	config : {
		msgTarget : '',
		msgNull : '该输入项不能为空！'
	},
    showProcessMsgBox : function (_msg){
		var msg = _msg || '数据提交中，请等候...';
		Ext.MessageBox.show({
	        msg: '<div style="margin: 5 5 8 15px;">' + msg + '</div>' +
	        	'<div style="margin-left: 8px;"><img src="' + sys.basePath + 'plugins/images/loading.gif"/></div>',
	        width: 300,
	        progress: false,
	        wait: false,
	        closable: true
	    });
	},
    hideProcessMsgBox : function () {
    	Ext.MessageBox.hide();
	},
	showErrorMsgBox	  : function (failMsg) {
		Ext.Msg.show({
           title: '失败提示',
           msg: failMsg || '对不起，您的操作失败.',
           width: 180,
           modal: false,
           buttons : Ext.Msg.OK,
           icon: Ext.MessageBox.ERROR
       });
	},
	debugJsonDetail	  : function (data) {
		if (data == undefined) {
	        return "";
	    }
	    var r = [];
	    if (typeof data == "string") return "\"" + data.replace(/([\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
	    if (typeof data == "object") {
	        if (!o.sort) {
	            for (var i in data)
	                r.push("\"" + i + "\":" + Common.debugJsonDetail(o[i]));
	            if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
	                r.push("toString:" + data.toString.toString());
	            }
	            r = "{" + r.join() + "}"
	        } else {
	            for (var i = 0; i < data.length; i++)
	                r.push(Common.debugJsonDetail(o[i]))
	            r = "[" + r.join() + "]";
	        }
	        return r;
	    }
	    return data.toString().replace(/\"\:/g, '":""');
	}
};