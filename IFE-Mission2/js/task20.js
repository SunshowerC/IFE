
var btn = document.getElementsByTagName("input");
var wrap = document.getElementsByClassName("block")[0];


function remove_clicked(obj){
	obj.onclick = function(){
		wrap.removeChild(obj);
	}
}


function init() {
	for (var i = 0; i < btn.length; i++) {
		btn[i].onclick = render;
	}
}


function render() {
	var text = document.getElementsByTagName("textarea")[0].value;
	var now_text =	text.split(/[,，;；、\s]+/);
	var find_text = document.getElementsByName("find")[0].value;

		switch(this.value){
			case "左侧入" :
				if(text==""){ alert("魂淡，啥都没输入啊！");return false; }
				for (var i = 0; i < now_text.length; i++) {
					var block = document.createElement("div");		
					block.innerHTML = now_text[i] ;
					remove_clicked(block);
					wrap.insertBefore(block,wrap.firstChild);				
				}
				break;

			case "右侧入" :
				if(text==""){ alert("魂淡，啥都没输入啊！");return false; }
				for (var i = 0; i < now_text.length; i++) {
					var block = document.createElement("div");		
					block.innerHTML = now_text[i] ;
					remove_clicked(block);
					wrap.appendChild(block,wrap.firstChild);				
				}				
				break;
			case "左侧出" :
				wrap.removeChild(wrap.firstElementChild);break;
			case "右侧出" :
				wrap.removeChild(wrap.lastElementChild);break;		
			case "查询" :
				if(find_text==""){ alert("魂淡，啥都没输入啊！");return false; }
				var now_div = wrap.getElementsByTagName("div");
				for (var i = 0; i < now_div.length; i++) {
					if( now_div[i].innerText.indexOf(find_text) >=0 )    {
						now_div[i].style.backgroundColor = 'red';
					}
				}
		}		
	
}


init();

