
$(function(){

	function Calender(config){
		this.container = config.container;
		this.id = config.id
		this.now = config.defaultDate ? new Date(config.defaultDate) : new Date();
		this.yearRange = config.yearRange;
		this.nowYear = this.now.getFullYear();  //年份
		this.nowMonth = this.now.getMonth() + 1 ;	//月份	
		this.nowDate = this.now.getDate();   //这月的第几日	
	}


	Calender.prototype =  {

		init: function() {
			this.createThead();
			this.createTbody();
			this.createSelect();
			this.createInput();
			this.bindEvent();

		},


		//创建表格头以及标题
		createThead: function(){
			var weekName = ['日','一','二','三','四','五','六']
			this.container.append(' <table id=' + this.id + '><thead><tr></tr></thead><tbody></tbody></table> ');
			var $thead = $('#'+ this.id + ' > thead > tr');
			for(var i = 0, len = weekName.length; i < len ; i++ ){
				$thead.append('<th>' + weekName[i] + '</th>') ;
			}
		},

		createTbody : function(){

			var nowFirstDay = new Date(this.nowYear + "/" + this.nowMonth + "/" + 1).getDay();//这月一号是星期几//周几（0,1,2,3,4,5,6,）
			var nowMonthDays = getNowMonthDays(this.nowYear,this.nowMonth); //这个月的天数
			var lastMonthDays = getNowMonthDays(this.nowYear,this.nowMonth - 1); //上月的天数
			var daysData = [];
//			console.log(this.nowYear+','+this.nowMonth+','+','+nowFirstDay+','+nowMonthDays+','+lastMonthDays);
			//添加上个月的数据
			for( var i = lastMonthDays - nowFirstDay + 1, len = lastMonthDays; i <= len; i++) {
				daysData.push(i);
			}

			//添加这个月的数据
			for(var j = 1, len = nowMonthDays; j <= nowMonthDays ; j++ ){
				daysData.push(j);
			}

			//添加下个月的数据
			for(var k = 1;daysData.length < 42; k++){
				daysData.push(k);	
			}

			//渲染tbody
			daysData = changeArr(daysData); //将数据转换成二维数组，便于使用
			var $tbody = $('#'+ this.id + ' > tbody ');
			$tbody.empty();
			for( var i = 0, rowLen = daysData.length; i < rowLen ; i++){				
				var $tr = $('<tr></tr>')
				for(var j = 0, colLen = daysData[i].length; j < colLen ; j++ ){					
					$tr.append('<td>'+ daysData[i][j] +'</td>');
				}
				$tbody.append($tr);
			}
			$('#'+ this.id + '>tbody td:lt('+nowFirstDay+')').addClass('lastMonth'); //标识上个月的日子
			$('#'+ this.id + '>tbody td:gt('+ (nowFirstDay+nowMonthDays-1) +')').addClass('nextMonth');//标识下个月的日子
		},

		//创建<select>年份月份选择
		createSelect: function(){
			var $curYearOption = this.nowYear - this.yearRange[0];
			var $tr = $('<tr></tr>');
			var $selectYear = $('<select id="year"></select>');
			var $selectMonth = $('<select id="month"></select>');			
			for( var begin = this.yearRange[0],end = this.yearRange[1]; begin < end; begin++ ) {
				$selectYear.append('<option value=' + begin + '>' + begin + '年</option>');
			}
			for( var i = 1; i < 13 ; i++){
				$selectMonth.append('<option value=' + i + '>' + i + '月</option>');
			}
						
			$tr.append($('<th colspan="7"></th>').append($selectYear).append($selectMonth));
			$('#'+ this.id + ' > thead ').prepend($tr);
			$('#year > option:eq('+$curYearOption+'),#month > option:eq('+(this.nowMonth-1)+')').attr('selected',true);  //设置默认选择项
		},

		createInput: function() {
			var $input = $('<input type="text" id="calenderInput"  placeholder="点击输入日期" />');
			$('#'+ this.id ).before($input);
		},

		//绑定事件
		bindEvent: function() {
			var This = this;
			var nowFirstDay = new Date(This.nowYear + "/" + This.nowMonth + "/" + 1).getDay();

			//select改变，渲染表格
			$('#year,#month').on('change',function(){
				This.now = new Date($('#year').val() + '/' + $('#month').val() + '/' + This.nowDate);
				This.refreshDate();
				This.createTbody();			
			});

			//点击事件
			$('#'+ this.id + ' > tbody ').on('click','td',function(){
				if (this.className == '') {
					$('#'+ This.id + ' > tbody  td ').removeClass('curDate');
					$(this).addClass('curDate');
					$('#calenderInput').val(This.nowYear+'-'+numFormat(This.nowMonth)+'-'+ numFormat($(this).html() ) );						
					This.now =new Date ($('#calenderInput').val() );
					This.refreshDate();
				}

			});

			//加载时触发click事件
			$('#'+ this.id + ' > tbody td:eq('+ (This.nowDate + nowFirstDay - 1) +') ').trigger('click');
		},

		refreshDate: function() {
			this.nowYear = this.now.getFullYear();  //年份
			this.nowMonth = this.now.getMonth() + 1 ;	//月份	
			this.nowDate = this.now.getDate();   //这月的第几日			
		}

	}

	function getNowMonthDays(year,month) {
		var days = 30;
		switch(month){
			case 0:   //指代12月
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				days = 31;break;
			case 2:
				if ((year%4 == 0 && year%100 != 0) || year%400 == 0) {
					days = 29 ;break ;
				}
				else
					days = 28 ; break;
		}
		return days;
	}

	function changeArr(arr){
		var newArr = [];
		for(var i = 0,len = arr.length/7 ; i < len; i++){
			newArr.push([ arr[i*7],arr[i*7+1],arr[i*7+2],arr[i*7+3],arr[i*7+4],arr[i*7+5],arr[i*7+6] ]);
		}
		return newArr;
	}

	function numFormat(num){
		if (num < 10) {
			return '0' + num;
		}
		return num;
	}


	var config = {
		id : 'calen',    //样式选择id
		container: $('.wrap'),   //容器
		yearRange: [1900,2100],
//		defaultDate: '2016-01-01'
	}
	var newCalen = new Calender(config);
	newCalen.init();


})
