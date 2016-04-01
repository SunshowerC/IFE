
//去除空格
function trim(str){
	return str.replace(/\s/g,"");
}

function confirm_input() {
	var tips = document.querySelector('.tips');
	var name = document.getElementById('name');
	var text = trim(name.value);

	if(text==null || text=="") {
		tips.innerText = '姓名不能为空';
		name.style.border = '1px solid red';
		tips.style.color = 'red';
	}
	else if( strlen(text)<4 || strlen(text)>16 ) {
		tips.innerText = '长度必须为4~16个字符';
		name.style.border = '1px solid red';
		tips.style.color = 'red';	
	}
	else {
		tips.innerText = '名称格式正确';
		name.style.border = '1px solid green';
		tips.style.color = 'green';	
	}

}

/*绑定事件-惰性载入*/
function addEvent(type,element,func ) {
	if( element.addEventListener){
		addEvent = function(type,element,func){
			element.addEventListener(type,func,false);
		}
	}

	if(element.attachEvent){
		addEvent = function (type,element,func){
			element.attachEvent('on'+type,func) ;
		}
	}

	else {
		addEvent = function(type,element,func) {
			element['on'+type] = func;
		}
	}
	
	return addEvent(type,element,func);
}

function strlen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1 
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        }
        else {
            len += 2;
        }
    }
    return len;
}

function btn_handle() {
	var btn = document.querySelector('.form button');
	console.log(btn);
	addEvent('click',btn,confirm_input);
	
	console.log('1');
}

function init() {
	btn_handle();
}

init();
