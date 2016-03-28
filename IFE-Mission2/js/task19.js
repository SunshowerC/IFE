
var btn = document.getElementsByTagName("input");
var wrap = document.getElementsByClassName("block_wrap")[0];

function trim(str){
	return str.replace(/\s/g,"");
}

function remove_clicked(obj){
	obj.onclick = function(){
		wrap.removeChild(obj);
	}
}

function check_input(){
	var input_reg = /^[\d]*$/;
	if( trim(btn[0].value) > 400 || trim(btn[0].value) < 0 )	{ alert("魂淡，超出规定范围啊！");return false;  }
	if(trim(btn[0].value)==""){ alert("魂淡，啥都没输入啊！");return false; }
	if( !input_reg.test( trim(btn[0].value) ) ){ alert("魂淡，不要输入奇奇怪怪的东西啊！");return false;  }	
	
	return true;
}

function add_block() {

	var block = document.createElement("div");
	block.innerHTML= '<p>' + trim(btn[0].value) + '</p>';
	block.style.height = trim(btn[0].value) + 'px' ;
	

	switch(this.value){
		case "左侧入" :
			if(!check_input()) return ;
			wrap.insertBefore(block,wrap.firstChild);break;
		case "右侧入" :
			if(!check_input()) return ;
			wrap.appendChild(block);break;
		case "左侧出" :
			wrap.removeChild(wrap.firstElementChild);break;
		case "右侧出" :
			wrap.removeChild(wrap.lastElementChild);break;		
		case "排序" :
			selector_sort();break;				
	}
	remove_clicked(block);

}

function init() {
	create_random_colume();
	for (var i = 1; i < btn.length; i++) {
		btn[i].onclick = add_block;
	}
	
}

function create_random_colume(){
	var colu_h = new Array(40);
	for (var i = 0; i < colu_h.length; i++) {
		colu_h[i] = Math.ceil(Math.random()*400);
//		console.log(colu_h[i]);
		var colu_block = document.createElement('div');
		colu_block.style.height = colu_h[i] + 'px' ;
		colu_block.innerHTML = "<p>"+colu_h[i] +"</p>"
		remove_clicked(colu_block);
		wrap.appendChild(colu_block);
	}
}

function selector_sort(){
	var now_colu = wrap.getElementsByTagName("div");
	var colu_h = new Array();
	for (var i = 0; i < now_colu.length; i++) {
		colu_h[i] = parseInt(now_colu[i].style.height.replace(/px/g,'')); 
	}
	var i = 0; var len = colu_h.length;
	var colu_anima = setInterval(function (){
		var min = colu_h[i];
		var index = i;
		var temp;
		if( i>= len )  {  clearInterval(colu_anima); return;  }
		for (var j = i+1; j < colu_h.length; j++) {
			if(colu_h[j] < min ){
				min = colu_h[j];
				index = j ;				
			}
		}		
		temp = colu_h[i];
		colu_h[i] = min;
		colu_h[index] = temp;
		i++;
		render(colu_h);		

	},300)

/*	for (var i = 0; i < colu_h.length; i++) {
		var min = colu_h[i];
		var index = i;
		var temp;
		for (var j = i+1; j < colu_h.length; j++) {
			if(colu_h[j] < min ){
				min = colu_h[j];
				index = j ;				
			}
		}
		
		temp = colu_h[i];
		colu_h[i] = min;
		colu_h[index] = temp;
		render(colu_h);
	}

	*/

}

function render(colu_h){
	wrap.innerHTML = "";
	for (var i = 0; i < colu_h.length; i++) {
		var sorted_colu = document.createElement('div');
		sorted_colu.style.height = colu_h[i] + 'px' ;
		sorted_colu.innerHTML = "<p>"+colu_h[i] +"</p>"
		remove_clicked(sorted_colu);
		wrap.appendChild(sorted_colu);		
	}
}

/*
function render(colu_h){
	wrap.innerHTML = "";
	for (var i = 0; i < colu_h.length; i++) {
		var sorted_colu = document.createElement('div');
		sorted_colu.style.height = colu_h[i] + 'px' ;
		sorted_colu.innerHTML = "<p>"+colu_h[i] +"</p>"
		remove_clicked(sorted_colu);
		wrap.appendChild(sorted_colu);		
	}
}
*/
init();

