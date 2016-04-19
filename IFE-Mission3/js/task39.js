
(function(){
	/*config: 配置项 
	*obj:要插入的地方，即表格的父元素
	*/
	function Table(config,obj){
		this.caption = config.caption;
		this.head = config.head;
		this.data = getFullTable(config);
		this.parent = obj;
		this.parent.className += ' content' ;
		this.sortWay = config.sortWay;  //升序，默认升序 
		this.isLockThead = config.isLockThead;
		this.isSorted = config.isSorted;
	}

	Table.prototype = {
		sortFlag : false,
		init: function() {
			this.createThead();
			this.sortTable(this.data[0].length - 1);  //初始化默认对最后一列（总分）进行排序
			this.bindEvent();

		},
		//创建表格头以及标题
		createThead: function(){
			this.parent.innerHTML = ' <table><caption>'+ this.caption +'</caption><thead><tr></tr></thead><tbody></tbody></table> ';
			var thead = this.parent.querySelector('thead>tr');
			for(var i = 0, len = this.head.length; i < len ; i++ ){
				thead.innerHTML += '<th>' + this.head[i] + '</th>';
			}
		},
		//创建表格主体
		createTbody: function() {		
			tbody = this.parent.querySelector('table>tbody');
			tbody.innerHTML = '';
			for(var i = 0, colLen = this.data.length; i < colLen; i++){
				var tr = document.createElement('tr');
				for(var j = 0, rowLen = this.data[i].length; j < rowLen ; j++) {
					tr.innerHTML += '<td>' + this.data[i][j] + '</td>'
				}
				tbody.appendChild(tr);
			}
		},

		/*排序，按第i列排序*/
		sortTable: function(i) {
			var This = this;
			var isChinese =  /[\u4e00-\u9fa5]+/.test(this.data[0][i]);
			if (This.sortWay == 'auto' || !This.sortWay) {
				This.sortFlag = !This.sortFlag;
			}
			
			This.data.sort(function(a,b){

				switch(This.sortWay){
					case 'asc': return isChinese ? b[i].localeCompare(a[i]) : b[i] - a[i];
					case 'des': return isChinese ? a[i].localeCompare(b[i]) : a[i] - b[i];
					default : 
					if (This.sortFlag) {
						return isChinese ? b[i].localeCompare(a[i]) : b[i] - a[i];
					}	
					else {
						return isChinese ? a[i].localeCompare(b[i]) : a[i] - b[i];
					}
				}
			});

			this.createTbody();
		},
		lockThead: function(head,thTop,tableBottom) {
			if (this.isLockThead) {
				var scroTop = document.documentElement.scrollTop || document.body.scrollTop;				
/*				console.log(tableBottom+'thead到顶部距离:'+ thTop +' ,\
					垂直滚动距离:'+scroTop+ ',head.offsetTop:' +head.offsetTop + ',\
					head.offsetHeight:' + head.offsetHeight+ ',head.clientHeight:' + head.clientHeight);
*/
/*  			//用relative实现
				var th = head.getElementsByTagName('th');
				if (scroTop - thTop > 0 && scroTop - tableBottom  < 0) {
					for (var i = 0, len = th.length; i < len; i++) {
						th[i].style.position = 'relative';
						th[i].style.top = scroTop - thTop + 'px';
					}			
				}
				else {
					for (var i = 0, len = th.length; i < len; i++) {
						th[i].style.top = 0 + 'px';
					}					
				}
*/

				//用fixed实现。
				if( scroTop - thTop > 0 && scroTop - tableBottom  < 0 ) {
					head.style.position = 'fixed';
					head.style.top = 0 + 'px'; 
				}
				else {
					head.style.position = '';	
				}
			}
		},

		//绑定th的排序事件，滚动首行冻结事件
		bindEvent: function() {
			var This = this;
			var head = this.parent.querySelector('table>thead');
			var th = head.getElementsByTagName('th');

			for (var i = 0, thLen = th.length; i < thLen ; i++) {
				th[i].index = i;
				th[i].isSorted = this.isSorted[i];
			}
			head.onclick = function(ev){
				ev = ev || window.event;
				var target = ev.target || ev.srcElement;
				if (target.nodeName.toLowerCase() == 'th' && target.isSorted == true) {
						console.log(target.index);
						This.sortTable(target.index);			
				}
			}

			/*首行锁定*/
			var thTop = getTop(head) ;    //thead 距离窗口顶部的距离
//			var thTop = head.getBoundingClientRect().top;
			var tableBottom = getTop(head.parentNode) + head.parentNode.clientHeight;  // table底部距离窗口顶部的距离
			window.onscroll = function() {
				This.lockThead(head,thTop,tableBottom);
			}
		}
	}
	/*
	*算出总分，返回新数据
	 */
	function getFullTable(config){
		var newdata = config.data;
		var sum = 0;
		for (var i = 0, colLen = config.data.length; i < colLen ;  i++) {
			for(var j = 1, rowLen = config.data[i].length; j < rowLen; j++ ){
				sum += config.data[i][j];
			}
			newdata[i].push(sum);
			sum = 0;
		}
		console.log(newdata);
		return newdata;
	}

	/*
	* 获取obj到 窗口顶部的距离
	 */
    function getTop(obj){
        var top = obj.offsetTop;
        while(obj = obj.offsetParent){
            top += obj.offsetTop;
        }
        return top;
    }	

	/*
	* 接口
	* @param obj(安放表格的容器) 
	* @param isLockThead(是否冻结thead) 值：true,false;
	* @param sortWay(排序方式) 值: asc:升序, des:降序, auto：升序降序来回切换, 默认为auto;
	* @param caption(表格标题) 值：string;
	* @param head              值：array;
	* @isSorted(是否可以排序，与head一一对应) 值：true/false; 
	* @param data              值：二维数组,第0列为名称, 其他为数据;
	 */
	var obj = document.querySelector('.wrap');  
	var config = {
		isLockThead: true ,
		sortWay: 'auto',  
		caption: '这是表格标题',
		head:     ['姓名','数学','语文','英语','体育','总分'],
		isSorted: [true,false,true,true,false,true],
		data: [
			['德华',76,44,68,76],
			['彦祖',88,95,35,86],
			['冠希',94,86,99,34],
			['尼玛',23,45,12,28],
			['尼妹',53,85,72,89]
												
		]
	}

	var tab = new Table(config,obj) ;
	tab.init();

}() );
