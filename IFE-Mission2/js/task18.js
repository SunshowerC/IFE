
var btn = document.getElementsByTagName("input");

function trim(str){
	return str.replace(/\s/g,"");
}

function add_block() {
	var wrap = document.getElementsByClassName("block")[0];
	var block = document.createElement("div");
	block.innerHTML= trim(btn[0].value);

	if(this.value=="左侧入")
		wrap.insertBefore(block,wrap.firstChild);
	else if(this.value == "右侧入")
		wrap.appendChild(block);
//		wrap.insertBefore(block,wrap.lastChild);
	else if(this.value == "左侧出")
		wrap.removeChild(wrap.firstElementChild);
	else 
		wrap.removeChild(wrap.lastElementChild);
	block.onclick = function(){
		wrap.removeChild(block);
	}
}

function init() {
	for (var i = 1; i < btn.length; i++) {
		btn[i].onclick = add_block;
	}
}

init();

