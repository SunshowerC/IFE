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
			console.log(node.childNodes[i].nodeValue);
			return trim(node.childNodes[i].nodeValue);}
	}
	return -1;
}

/**改变背景颜色*/
function change_bg(node_list,text) {
	var i = 0;  //清除上一个颜色 标识
	
	disable_btn();
	reset(node_list);
	console.log(node_list);
	stop = setInterval(function(){
		if (i==node_list.length) {    //遍历完所有元素，停止
			node_list[i-1].style.backgroundColor = 'white';
			clearInterval(stop); 
			enable_btn();
			console.log('done'); 
		}
		else{

			node_list[i++].style.backgroundColor = '#8BCAFF';  //设置当前检索层为蓝色
//			console.log(i);
			if(i>1)  node_list[i-2].style.backgroundColor = 'white'; //清除上一检索层颜色
			if (text == text_node(node_list[i-1]) ) {                //检索逻辑
				node_list[i-1].style.backgroundColor = 'red';
				clearInterval(stop); 
				enable_btn();
//				console.log(text_node(node_list[i-1]));
			}			


		}
		
	},400);
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

		case 0 :  //深度优先遍历
			depth_order(root_node,node_list);
			change_bg(node_list);
			break;
		case 1 : //广度优先遍历
			lever_order(root_node,node_list);
			i_def = 0;
			change_bg(node_list);
			break;			
		case 2 : //深度优先检索
			if (text=="") { alert('请输入检索内容');  return false;}
			depth_order(root_node,node_list);
			change_bg(node_list,text);		
			break;	
		case 3 : //广度优先检索
			if (text=="") { alert('请输入检索内容');  return false;}
			lever_order(root_node,node_list);
			i_def = 0;
			change_bg(node_list,text);		
			break;	
		case 4 :  //删除按钮事件
			var div_clicked = document.querySelector('#clicked');
			if (!div_clicked) { alert('请选择节点元素'); return false;  }
			if (div_clicked == root_node) { alert("兄台请不要删除根元素");return false; }
			div_clicked.parentNode.removeChild(div_clicked);
			break;
		case 5 :  //增加元素事件
			add_element();
			break;	
	}
}

/*
*添加元素事件处理
 */
function add_element() {
	var div_clicked = document.querySelector('#clicked');
	var div_created = document.createElement('div');
	var add_div = document.querySelector('#add');
	var text =  trim(add_div.value);
	if ( text=='' ) { alert('请输入要添加的元素内容'); return false; }
	if (!div_clicked) { alert('请选择节点元素'); return false;  }
	div_created.innerText = text;
	div_clicked.appendChild(div_created);
	
}

function btn_handle_init() {
	var btn = document.getElementsByTagName('button');
	for (var i = 0; i < btn.length; i++) {
		(function(i){
			addEvent('click',btn[i],function(){
				btn_clicked(i)
				}
			);
		}(i));

	};	
		
}


/*
获取div,并绑定事件,事件委托
*/
function div_clicked_init() {
	var node_list = [] ;
	var root_node = document.getElementsByClassName('root')[0];	
	depth_order(root_node,node_list);
	addEvent('click',root_node,function(ev){
		var ev = ev || window.event ;
		var target = ev.target ||ev.srcElement;
		if (target.nodeName.toLowerCase() == 'div' ) {
			if (document.querySelector("#clicked")) {
				document.querySelector("#clicked").id = ''; 
			}
			target.id = 'clicked';
		}
	})

}

function disable_btn() {
	var btn =document.getElementsByTagName('button');
	btn[4].className = 'disabled' ;
	btn[5].className = 'disabled' ;	
}

function enable_btn() {
	var btn =document.getElementsByTagName('button');
	btn[4].className = '' ;
	btn[5].className = '' ;	
}

function init() {
	btn_handle_init();
	div_clicked_init();
}



window.onload = init;


