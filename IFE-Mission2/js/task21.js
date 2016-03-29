
var tag_wrap = document.getElementById('tag_wrap');
var tag = document.getElementById("tag");
var habit_wrap = document.getElementById('habit_wrap');
var habit_btn = habit_wrap.getElementsByTagName('button')[0];

//去除空格
function trim(str){
	return str.replace(/\s/g,"");
}

/*点击块删除事件*/
function remove_clicked(obj){
	obj.onclick = function(){
		obj.parentNode.removeChild(obj);
	}
/*	obj.onmouseover = function() {

	}*/
}

/*tag处理事件*/
function tag_handle(){
	
	var block = document.createElement("div");
	if (trim(tag.value)=="") { alert("请输入东西!"); return false; }
	block.innerHTML= trim(tag.value);
	tag_wrap.appendChild(block);
	remove_clicked(block);
	tag.value = "";
	var now_div = tag_wrap.getElementsByTagName('div');
	while (now_div.length > 10) {
		tag_wrap.removeChild(now_div[0]);
		now_div = tag_wrap.getElementsByTagName('div');
//		console.log(now_div.length);
	}	
}

/*textarea处理事件*/
function text_handle(){
	var text = document.getElementsByTagName("textarea")[0].value;
	var now_text = text.split(/[,，;；、\s]+/);
//	console.log(now_text);
	for (var i = 0; i < now_text.length; i++) {
		var block = document.createElement("div");
//		if (now_text[i]=='') { now_text.splice(i,1); }
		block.innerHTML= now_text[i]; 
		habit_wrap.appendChild(block);
		remove_clicked(block);
	}
	
	var now_div = habit_wrap.getElementsByTagName('div');
	while (now_div.length > 10) {
		habit_wrap.removeChild(now_div[0]);
		now_div = habit_wrap.getElementsByTagName('div');
//		console.log(now_div.length);
	}
}

function handle_init(){
	var tag = document.getElementById("tag");

	tag.onkeydown=function(event){
	    var e = event || window.event || arguments.callee.caller.arguments[0];
	    if(e && e.keyCode==27){ // 按 Esc 
	        //要做的事情
	      }
	    if(e && e.keyCode==113){ // 按 F2 
	         //要做的事情
	       }            
	    if(e && e.keyCode==13 || e.keyCode==32 ||e.keyCode==188){ // enter 键
	        tag_handle();

	    }
	}

	habit_btn.onclick = function(){
		text_handle();
	}
}



function init(){
	handle_init();
}

init();
