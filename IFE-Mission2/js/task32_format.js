
var pwReg = /[^\u4e00-\u9fa5]{6,22}/;  //密码正则表达式

var formFormat = {
	name:{
		label: '名称',
		name: 'name',
		type: 'text',
		validator: function(nameText) {
			if ( strlen(nameText)>= 4 && strlen(nameText)<= 16 ) 
				return this.success ;
			else if (nameText == '' || nameText.length < 1 ) 
				return this.empty;
			else 
				return this.fail;
		},
		rules: '必填，长度为4-16个字符',
		success: '名称格式正确',
		fail: '名称格式错误',
		empty: '名称不能为空'
	},

	password:{
		label: '密码',
		name: 'password',
		type: 'password',
		validator: function(pwText) {
			
			if ( pwReg.test(pwText) ) 
				return this.success ;
			else if (pwText == '' || pwText.length < 1 ) 
				return this.empty;
			else 
				return this.fail;
		},
		rules: '长度为6-22的数字，字母，符号组合',
		success: '格式正确',
		fail: '格式错误',
		empty: '密码不能为空'
	},

	valiPw:{
		label: '确定密码',
		type: 'password',
		name: 'valiPw',
		validator: function(valiPwText) {
			var pwText = document.querySelector('input[name="password"]').value;
			if ( pwReg.test(pwText) && pwText == valiPwText ) 
				return this.success ;
			else if (valiPwText == '' || valiPwText.length < 1 ) 
				return this.empty;
			else 
				return this.fail;
		},
		rules: '请再次输入密码',
		success: '输入密码正确',
		fail: '密码输入不一致或密码格式错误',
		empty: '密码不能为空'
	},

	email:{
		label: '邮箱',
		type: 'email',
		name: 'email',
		validator: function(emText) {
			var emReg = /^\w+@(\w+\.)+(com)$/i ;
			if ( emReg.test(emText) ) 
				return this.success ;
			else if (emText == '' || emText.length < 1 ) 
				return this.empty;
			else 
				return this.fail;
		},
		rules: '邮箱格式XXX@XXX.com',
		success: '格式正确',
		fail: '格式错误',
		empty: '邮箱输入不能为空'
	},

	phone:{
		label: '手机',
		type: 'tel',
		name: 'phone',
		validator: function(phText) {
			var phReg = /[\d]{6,15}/ ;
			if ( phReg.test(phText) ) 
				return this.success ;
			else if (phText == '' || phText.length < 1 ) 
				return this.empty;
			else 
				return this.fail;
		},
		rules: '手机号码为6-15位数字',
		success: '格式正确',
		fail: '格式错误',
		empty: '手机输入不能为空'
	}	
}

