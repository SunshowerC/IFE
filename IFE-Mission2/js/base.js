//去除空格
function trim(str){
	return str.replace(/\s/g,"");
}

/*绑定事件-惰性载入*/
function addEvent(type,element,func ) {
	if( element.addEventListener ){
		addEvent = function(type,element,func){
			element.addEventListener(type,func,false);
		}
	}

	else if(element.attachEvent){
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
