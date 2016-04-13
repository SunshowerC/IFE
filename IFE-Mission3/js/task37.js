(function(){
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

	Pop.prototype = {
		init: function(){
			this.createDom();
			this.bindEvent();
		},
		createDom: function(){
			//增加遮罩
			this.mask = document.createElement('div');
			this.mask.className = 'mask';
			document.body.appendChild(this.mask);

			//增加弹出层
			this.obj.innerHTML = '<h2>' + this.title + '</h2>' + '<p>' + this.content + '</p>';
			document.body.appendChild(this.obj);		
		},
		bindEvent: function() {
			var This = this;
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

			//移除遮罩和弹出层
			This.obj.onclick = function(ev) {
				var ev = ev || window.event;
				ev.stopPropagation();
			}	
			document.onclick = function() {
				document.body.removeChild(This.obj);
				document.body.removeChild(This.mask);
				document.onclick =null;
			}		
		}
	}

	btn.onclick = function(ev){
		var ev = ev || window.event;
		ev.stopPropagation();		
		var d = new Pop(400,200,'标题','内容，好多的内容，内容，好多的内容。内容，好\
			多的内容，内容，好多的内容。内容，好多的内容，内容，好多的内容。内容，好\
			多的内容，内容，好多的内容。内容，好多的内容，内容，好多的内容。内容，好\
			多的内容，内容，好多的内容。');
		d.init();		
	}
}() )



