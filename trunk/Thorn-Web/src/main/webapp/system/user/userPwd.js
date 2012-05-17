var ChangePwd = sys.basePath + "user/changePwd.jmt";
var ChangeMyPwd = sys.basePath + "user/changeMyPwd.jmt";
var pwdUrl;
var type;

var UserPwd = function(_type) {
	type = _type;
	if (type == "my") {
		pwdUrl = ChangeMyPwd;
	} else {
		pwdUrl = ChangePwd;
	}

	this.form = new FormPanel({
				id : "pwdForm",
				collapsible : false,
				labelWidth : 80,
				border : false
			});
	this.form.addItem(getPanelItem(getPwdTxt("newPwd", "密码", 200), 1.0, false));

	this.form.addItem(getPanelItem(
			getRPwdTxt("newrPwd", "重复密码", 200, "newPwd"), 1.0, false));

	this.form.addItem(getPanelItem({
				id : "userId",
				xtype : "hidden"
			}, 0, true));

	var win_attr = {
		width : 340,
		height : 150
	};
	if (type == "my") {
		win_attr.closable = false;
		win_attr.draggable = false;
	}

	this.win = new OpenWindow(win_attr, this.form.getFormPanel(),
			changePwdHandler);

	function changePwdHandler() {
		var window = this.openWin;

		var form = window.getComponent("pwdForm").getForm();

		if (!form.isValid()) {
			Ext.Msg.alert("提示信息", "请填写完整的信息!");
			return;
		}

		var callBack_obj = new Object();
		callBack_obj.win = this;
		var ajaxClass = new CommonAjax(pwdUrl);
		ajaxClass.submitForm(form, null, true, callBack_obj, function(obj) {
					if (type != "my") {
						obj.win.hide();
					}
				});
	}
}

UserPwd.prototype.show = function(uid) {
	this.form.getForm().reset();
	this.form.getFormPanel().findById("userId").setValue(uid);
	this.win.show("修改密码");
}
