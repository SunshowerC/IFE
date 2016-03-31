var i_def = 0;  //广度优先遍历 标识
var stop;   //setInterval 句柄

/*深度优先遍历*/
function depth_order(node,node_list) {
	if (node) {
		node_list.push(node);
		depth_order(node.firstElementChild,node_list);
		depth_order(node.nextElementSibling,node_list);
	}
}

/*广度优先遍历*/
function lever_order(node,node_list) {
	if (node) {
		node_list.push(node);
		lever_order(node.nextElementSibling,node_list);
		node = node_list[i_def++];
		lever_order(node.firstElementChild,node_list);
	}
}

//去除空格
function trim(str){
	return str.replace(/\s/g,"");
}

//过滤出文本节点
function text_node(node) {
	for (var i = 0; i < node.childNodes.length; i++) {
		if(node.childNodes[i].nodeType == 3 && trim(node.childNodes[i].nodeValue)!="" ){  //文本节点，且其内容不为空
	//		console.log(node.childNodes[i].nodeValue);
			return trim(node.childNodes[i].nodeValue);}
	}
	return -1;
}

/**改变背景颜色*/
function change_bg(node_list,text) {
	var i = 0;  //清除上一个颜色 标识
	reset(node_list);
	console.log(node_list);
	stop = setInterval(function(){
		if (i==node_list.length) {
			node_list[i-1].style.backgroundColor = 'white';
			clearInterval(stop); 
			console.log('done'); 
		}
		else{

			node_list[i++].style.backgroundColor = '#8BCAFF';  //设置当前检索层为蓝色
			console.log(i);
			if(i>1)  node_list[i-2].style.backgroundColor = 'white'; //清除上一检索层颜色
			if (text == text_node(node_list[i-1]) ) {
				node_list[i-1].style.backgroundColor = 'red';
				clearInterval(stop); 
//				console.log(text_node(node_list[i-1]));
			}			


		}
		
	},800);
}

/*复位*/
function reset(node_list) {
	clearInterval(stop); 
	for (var i = 0; i < node_list.length; i++) {
		node_list[i].style.backgroundColor = 'white';
	}
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

function btn_clicked(btn_index) {
	var root_node = document.getElementsByClassName('root')[0];
	var node_list = [];
	var search_input = document.getElementById('search');
	var text = trim(search_input.value);
	console.log(text);
	
	switch(btn_index) {

		case 0 :
			depth_order(root_node,node_list);
			change_bg(node_list);
			break;
		case 1 :
			lever_order(root_node,node_list);
			i_def = 0;
			change_bg(node_list);
			break;			
		case 2 :
			if (text=="") { alert('请输入检索内容');  return false;}
			depth_order(root_node,node_list);
			change_bg(node_list,text);		
			break;	
		case 3 :
			if (text=="") { alert('请输入检索内容');  return false;}
			lever_order(root_node,node_list);
			i_def = 0;
			change_bg(node_list,text);		
			break;	
	}
}

function btn_handle() {
	var btn = document.getElementsByTagName('button');
	
/*			
	addEvent('click',btn[0],function(){
		btn_clicked(0);
	});
	addEvent('click',btn[1],function(){
		btn_clicked(1);
	});
	addEvent('click',btn[2],function(){
		btn_clicked(2);
	});
	addEvent('click',btn[3],function(){
		btn_clicked(3);
	});	*/		

for (var i = 0; i < btn.length; i++) {
	(function(i){
		btn[i].onclick = function(){
			btn_clicked(i);
		}
	}(i));


};	
		


}

window.onload = btn_handle;


