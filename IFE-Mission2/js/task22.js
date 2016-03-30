var stop;

/*复位*/
function reset(node_list) {
	clearInterval(stop); 
	for (var i = 0; i < node_list.length; i++) {
		node_list[i].style.backgroundColor = 'white';
	}
}

/**改变背景颜色*/
function change_bg(node_list) {
	var i = 0;
	
	reset(node_list);
	stop = setInterval(function(){
		if (i==node_list.length) {
			node_list[i-1].style.backgroundColor = 'white';
			clearInterval(stop); 
			console.log('done'); 
		}
		else{
			node_list[i++].style.backgroundColor = '#8BCAFF';
			if(i>1)  node_list[i-2].style.backgroundColor = 'white';
/*			console.log(i);
			console.log(node_list.length);*/
		}
		
	},800);
}

/*前序遍历*/
function pre_order(node,node_list) {
	if (node) {
		node_list.push(node);
		pre_order(node.firstElementChild,node_list);
		pre_order(node.lastElementChild,node_list);
	}
}

/*中序遍历*/
function in_order (node,node_list) {
	if (node) {
		in_order(node.firstElementChild,node_list);
		node_list.push(node);
		in_order(node.lastElementChild,node_list);
	}
}

/*后序遍历*/
function post_order (node,node_list) {
	if (node) {
		post_order(node.firstElementChild,node_list);
		post_order(node.lastElementChild,node_list);
		node_list.push(node);
	}
}

function btn_handle(btn_index) {
	var root_node = document.getElementsByClassName('root')[0];
	var node_list = [];	
	console.log(btn_index);
	switch(btn_index){
		case 0:
			pre_order(root_node,node_list);break;
		case 1:
			in_order(root_node,node_list);break;
		case 2:
			post_order(root_node,node_list);break;
	}
	change_bg(node_list);

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

function init() {
	var btn = document.getElementsByTagName('button');	
//	addEvent('click',btn[0],change_bg(node_list) );	  //BUG，自动运行
//	addEvent('click',btn[0],function() {change_bg(node_list)} );	//正常
/*	btn[0].onclick = function() {     //异常
		change_bg(node_list);
	}
	btn[0].onclick = change_bg(node_list);*/	//BUG：无匿名函数自动运行
	addEvent('click',btn[0],function() {btn_handle(0)} );
	addEvent('click',btn[1],function() {btn_handle(1)} );
	addEvent('click',btn[2],function() {btn_handle(2)} );
}

init();
