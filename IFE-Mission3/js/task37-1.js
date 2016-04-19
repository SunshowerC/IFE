(function(){
/*
* Pop , config:配置项； btn:绑定的句柄
 */
	function Pop(config,btn) {
		this.obj = document.createElement('div');
		this.obj.id = 'pop';
		this.obj.style.width = config.width + 'px' ;
		this.obj.style.color = config.color;
		this.obj.style.background = config.background;
		this.title = config.title;
		this.content = config.content;
		this.btn = btn;
	}

	Pop.prototype = {
		disX: 0,
		dixY: 0,

		init: function(){
			var That = this;
			addEvent('click',this.btn,function(){
				var ev = ev || window.event;
				ev.stopPropagation();						
				That.createDom();
				That.bindEvent();					
			})
			

		},
		createDom: function(){
			//增加遮罩
			this.mask = document.createElement('div');
			this.mask.className = 'mask';
			document.body.appendChild(this.mask);

			//增加弹出层
			this.obj.innerHTML = '<h2>' + this.title + '</h2>' + '<p>' + this.content + '</p>' +'<button class="cancel">取消' + '</button>\
			' + '<button class="ensure">确定' + '</button>';
			document.body.appendChild(this.obj);		
		},
		bindEvent: function() {
			var This = this;
			// 弹出层移动
			// 
			//移除遮罩和弹出层
/*			This.obj.onclick = function(ev) {
				var ev = ev || window.event;
				ev.stopPropagation();
			}	
			*/
			var stopPropaga = function(ev){
				var ev = ev || window.event;
				ev.stopPropagation();				
			}
			addEvent('click',This.obj,stopPropaga);


			var removeMask = function() {
				document.body.removeChild(This.obj);
				document.body.removeChild(This.mask);		
//				document.onclick = null;
//				document.removeEventListener('click',removeMask,false);
				removeEvent('click',document,removeMask);
			}

//			document.onclick = removeMask;
			addEvent('click',document,removeMask);

			This.obj.onmousedown = function(ev) {
				var ev = ev || window.event;
				var target = ev.target ||ev.srcElement;
				This.disX = ev.clientX - This.obj.offsetLeft; //获取光标相对位置
				This.disY = ev.clientY - This.obj.offsetTop;	

				var mousemo = function(ev) {
					ev = ev || window.event;
					This.obj.style.left = ev.clientX - This.disX + 'px';
					This.obj.style.top = ev.clientY - This.disY + 'px';						
				}

				addEvent('mousemove',document,mousemo);

				addEvent('mouseup',document,function(ev){
					ev = ev || window.event ;
					var target = ev.target ||ev.srcElement;
					if (target.nodeName.toLowerCase() == 'button' && target.parentNode == This.obj) {
//						removeMask();
						document.body.removeChild(This.obj);
						document.body.removeChild(This.mask);
//						removeEvent('click',document,removeMask);
					}
					document.onmousedown = null;
					removeEvent('mousemove',document,mousemo);
				})
	
				
			}




/*			document.onclick = function() {
				document.body.removeChild(This.obj);
				document.body.removeChild(This.mask);
				document.onclick =null;
			}*/
		}
	}

/* 
* config 接口对象
* @parameter width: 弹出层宽度
*                   高度自适应
* @parameter color: 内容字体颜色                  
* @parameter background 内容背景颜色
* @parameter title: 弹出层的标题
* @parameter content 弹出层内容
* */
	var btn = document.querySelector('.content button');
	var config = {
		width: 400,
		color: '#666',
		background: '#fff',
		title: '这是标题' ,
		content: '内容，好多的内容，内容，好多的内容。内容，好\
		多的内容，内容，好多的内容。内容，好多的内容，内容，好\
		多的内容。内容，好多的，内容，好多的，内容，好多的，内容，好多的，内内容，好多的，内容，好多的，内容，好多的，内容，好多的，内容，好多的，内容，好多的内容。'
	};

	var newPop = new Pop(config,btn);
	newPop.init();

}() )
