var stop;

/*��λ*/
function reset(node_list) {
	clearInterval(stop); 
	for (var i = 0; i < node_list.length; i++) {
		node_list[i].style.backgroundColor = 'white';
	}
}

/**�ı䱳����ɫ*/
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

/*ǰ�����*/
function pre_order(node,node_list) {
	if (node) {
		node_list.push(node);
		pre_order(node.firstElementChild,node_list);
		pre_order(node.lastElementChild,node_list);
	}
}

/*�������*/
function in_order (node,node_list) {
	if (node) {
		in_order(node.firstElementChild,node_list);
		node_list.push(node);
		in_order(node.lastElementChild,node_list);
	}
}

/*�������*/
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

/*���¼�-��������*/
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
//	addEvent('click',btn[0],change_bg(node_list) );	  //BUG���Զ�����
//	addEvent('click',btn[0],function() {change_bg(node_list)} );	//����
/*	btn[0].onclick = function() {     //�쳣
		change_bg(node_list);
	}
	btn[0].onclick = change_bg(node_list);*/	//BUG�������������Զ�����
	addEvent('click',btn[0],function() {btn_handle(0)} );
	addEvent('click',btn[1],function() {btn_handle(1)} );
	addEvent('click',btn[2],function() {btn_handle(2)} );
}

init();
