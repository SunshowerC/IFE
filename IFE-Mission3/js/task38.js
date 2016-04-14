
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
	}

	Table.prototype = {
		sortFlag : false,
		init: function() {
			this.createThead();
			this.sortTable(this.data[0].length - 1);  //初始化默认对最后一列（总分）进行排序
			this.bindEvent();

		},

		createThead: function(){
			this.parent.innerHTML = ' <table><caption>'+ this.caption +'</caption><thead><tr></tr></thead><tbody></tbody></table> ';
			var thead = this.parent.querySelector('thead>tr');
			for(var i = 0, len = this.head.length; i < len ; i++ ){
				thead.innerHTML += '<th>' + this.head[i] + '</th>';
			}
		},

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
			if (This.sortWay == 'auto' || !This.sortWay) {
				This.sortFlag = !This.sortFlag;
			}
			
			This.data.sort(function(a,b){
				switch(This.sortWay){
					case 'asc': return b[i] - a[i];
					case 'des': return a[i] - b[i];
					default : 
					if (This.sortFlag) {
						return b[i] - a[i];
					}	
					else {
						return a[i] - b[i];
					}
				}
			});

			this.createTbody();
		},

		bindEvent: function() {
			var This = this;
			var head = this.parent.querySelector('table>thead');
			var th = head.getElementsByTagName('th');
			for (var i = 0, thLen = th.length; i < thLen ; i++) {
				th[i].index = i;
			}
			head.onclick = function(ev){
				ev = ev || window.event;
				var target = ev.target || ev.srcElement;
				if (target.nodeName.toLowerCase() == 'th' && target.index != 0) {
						This.sortTable(target.index);			
				}
			}
		}
	}

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
	* 接口
	* @param obj(安放表格的容器) 
	* @param sortWay(排序方式) 值: asc:升序, des:降序, auto：升序降序来回切换, 默认为auto;
	* @param caption(表格标题) 值：string;
	* @param head              值：array;
	* @param data              值：二维数组,第0列为名称, 其他为数据;
	 */
	var obj = document.querySelector('.wrap');  
	var config = {
		sortWay: 'auto',  
		caption: '这是表格标题',
		head: ['姓名','数学','语文','英语','体育','总分'],
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
