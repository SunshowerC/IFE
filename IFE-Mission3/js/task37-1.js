var btn = document.querySelector('.content button');

function Pop(width,height,title,content) {
	this.obj = document.createElement('div');
	this.disX = 0;
	this.disY = 0;
	this.obj.id = 'pop';
	this.obj.style.width = width + 'px' ;
	this.obj.style.height = height + 'px' ;
	this.title = title;
	this.content = content;

}

Pop.prototype.init = function() {
	var This = this;	
	
	//增加遮罩
	var mask = document.createElement('div');
	mask.className = 'mask';
	document.body.appendChild(mask);

	//增加弹出层
	This.obj.innerHTML = '<h2>' + This.title + '</h2>' + '<p>' + This.content + '</p>';
	document.body.appendChild(This.obj);

	// 弹出层移动
	This.obj.onmousedown = function(ev) {
		var ev = ev || window.event;
		This.disX = ev.clientX - This.obj.offsetLeft; //获取光标相对位置
		This.disY = ev.clientY - This.obj.offsetTop;	
		document.onmousemove = function(ev)	 {
			var ev = ev || window.event;
			This.obj.style.left = ev.clientX - This.disX + 'px';
			This.obj.style.top = ev.clientY - This.disY + 'px';
		}

		document.onmouseup = function() {	
			document.onmousedown = null;
			document.onmousemove = null;
		}
			
	}

	addEvent('click',This.obj,function(ev) {
		var ev = ev || window.event;
		ev.stopPropagation();
	} ); 	

	addEvent('click',document,function() {
		with(This){
		document.body.removeChild(This.obj);
		removeEvent('click',document,function(){});
		}
		document.body.removeChild(mask);
		removeEvent('click',document,function(){});
	}  );

}

window.onload = function(){
	addEvent('click',btn,function(ev){
	var ev = ev || window.event;
	ev.stopPropagation();		
	var d = new Pop(400,200,'标题','内容，好多的内容，内容，好多的内容。内容，好多的内容，内容，好多的内容。内容，好多的内容，内容，好多的内容。内容，好多的内容，内容，好多的内容。内容，好多的内容，内容，好多的内容。内容，好多的内容，内容，好多的内容。');
	d.init();		
} ) ;

}

