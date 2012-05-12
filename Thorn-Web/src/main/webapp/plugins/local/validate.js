var Validate = {
	number : "该输入项为数字格式！",
	email : "该输入项为邮箱格式！",
	empty : "该输入项不能为空！",
	date : "该输入项为日期格式，格式YYYY-MM-DD",
	redStar : '<em class="required">*</em>'
}

Ext.apply(Ext.form.VTypes, {
			number : function(val, field) {
				if(! Ext.isEmpty(val)) {
					var reg = /^[-]{0,1}[0-9]{1,}$/; 
					return reg.test(val); 
				}
				return true;
			}
		});