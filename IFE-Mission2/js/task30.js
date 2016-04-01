/*
*设置输入框和提示文本的样式
 */
function set_status(tips,obj,status) {
	obj.className ='';
	tips.className='tips';
	obj.className += status;
	tips.className += status;	
}

/*
*验证名称输入
 */
function name_confirm(obj) {
//	var tips = document.querySelector('.tips');
//	var name = document.getElementById('name');
	var tips = obj.parentNode.nextElementSibling;
	var name_text = trim(obj.value);
	if(name_text==null || name_text=="") {
		tips.innerText = '名称不能为空';
		set_status(tips,obj,' wrong');

	}
	else if( strlen(name_text)<4 || strlen(name_text)>16 ) {
		tips.innerText = '长度必须为4~16个字符';
		set_status(tips,obj,' wrong');

	}
	else {
		tips.innerText = '名称格式正确';
		set_status(tips,obj,' correct');

	}
}
/*
*密码验证
 */
function pw(obj) {
	var tips = obj.parentNode.nextElementSibling;
	var pw_text = obj.value;
	 var pw_reg = /[^\u4e00-\u9fa5]{6,22}/;
//	var pw_reg = /[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}/;
	if ( pw_reg.test(pw_text) ) {
		tips.innerText = '密码可用';
		set_status(tips,obj,' correct');
		return true;
	}
	else {
		tips.innerText = '请按要求输入密码';
		set_status(tips,obj,' wrong');
		return false;
	}
}
/*
*再次输入密码验证
 */
function pw_confirm(obj) {
	var tips = obj.parentNode.nextElementSibling;
	var pw_confirm_text = obj.value;
	var pw_text = document.getElementById('pw').value;
	if (pw_text=='') {  
		tips.innerText = '请先输入密码';
		set_status(tips,obj,' wrong');
		return false;
	}
	else if (pw_text == pw_confirm_text) {
		tips.innerText = '密码输入正确';
		set_status(tips,obj,' correct');		
	}
	else {
		tips.innerText = '密码输入不一致';
		set_status(tips,obj,' wrong');		
	}
}

/*
*邮件验证
 */
function email_confirm(obj) {
	var tips = obj.parentNode.nextElementSibling;
	var email_text = trim(obj.value);
	var apos = email_text.indexOf('@');
	var dotpos = email_text.lastIndexOf('.');
	if(apos < 1 || dotpos - apos < 2 ){
		tips.innerText = '邮箱格式输入错误';
		set_status(tips,obj,' wrong');			
	}
	else {
		tips.innerText = '邮箱输入正确';
		set_status(tips,obj,' correct');			
	}
}

/*
*手机号码验证
 */
function phone_confirm(obj) {
	var tips = obj.parentNode.nextElementSibling;
	var phone_num = obj.value;
	var pw_reg = /[\d]{4,13}/;
	if (pw_reg.test(phone_num) ) {
		tips.innerText = '手机格式输入正确';
		set_status(tips,obj,' correct');		
	}
	else {
		tips.innerText = '手机输入格式错误';
		set_status(tips,obj,' wrong');		 
	}	
}
/*
*对焦事件处理
 */
function onfocus_handle(obj){
	var tips = obj.parentNode.nextElementSibling;
	set_status(tips,obj,' correct');
	switch(obj.name) {
		case 'name'      : tips.innerText = '请输入长度为4~16个字符';break;
		case 'pw'        : tips.innerText = '请输入长度为6~16个字母或数字和符号';break;
		case 'pw_confirm': tips.innerText = '请再次输入密码';break;
		case 'email'     : tips.innerText = '请按照格式输入邮箱地址';break;
		case 'phone'     : tips.innerText = '请输入手机号码';break;
	}
}

/*
*失去焦点事件处理
 */
function onblur_handle(obj){
	switch(obj.name) {
		case 'name'      : name_confirm(obj);break;
		case 'pw'        : pw(obj);break;
		case 'pw_confirm': if(pw(obj)) pw_confirm(obj); else obj.parentNode.nextElementSibling.innerText = '请按要求输入密码';break;
		case 'email'     : email_confirm(obj);break;
		case 'phone'     : phone_confirm(obj);break;
	}	
}

/*
*初始化，事件绑定
 */
function init() {
//	var name = document.getElementById('name');
	var form = document.querySelector('.form');
	var inp = form.getElementsByTagName('input');
//	addEvent('blur',name,name_confirm);
	var btn = form.querySelector('button');
	addEvent('click',btn,function(){
		console.log(inp);
		for (var i = 0; i < inp.length; i++) {
			
			console.log(inp[i].className);
			if(trim(inp[i].className) == 'wrong' || inp[i].className==''){
				alert('你的输入有误！');
				return true;
			}
			if(i == inp.length -1) {
				alert('提交成功.');
				return false;
			}
		}
	});
	for (var i = 0; i < inp.length; i++) {
		inp[i].onblur = function(ev) {
			var ev = ev || window.event;
			var target = ev.target || ev.srcElement ;
			if(target.nodeName.toLowerCase() =='input' ) {
//				console.log(target);
				onblur_handle(target);
			}
		}
		inp[i].onfocus = function(ev) {
			var ev = ev || window.event;
			var target = ev.target || ev.srcElement ;
			if(target.nodeName.toLowerCase() =='input' ) {
				onfocus_handle(target);
			}
		}		
	}
}

init();
