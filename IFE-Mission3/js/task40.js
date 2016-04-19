
$(function(){

	function Calender(config){
		this.container = config.container;
		this.id = config.id
		this.now = new Date();
		this.yearRange = config.yearRange;
/*			var nowYear = this.now.getFullYear();  //年份
			var nowMonth = this.now.getMonth() + 1 ;	//月份*/		
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
			var nowYear = this.now.getFullYear();  //年份
			var nowMonth = this.now.getMonth() + 1 ;	//月份
//			var nowDate = this.now.getDate();   //这月的第几日
			var nowFirstDay = new Date(nowYear + "/" + nowMonth + "/" + 1).getDay();//这月一号是星期几//周几（0,1,2,3,4,5,6,）
			var nowMonthDays = getNowMonthDays(nowYear,nowMonth); //这个月的天数
			var lastMonthDays = getNowMonthDays(nowYear,nowMonth-1); //上月的天数
			var daysData = [];
			console.log(nowYear+','+nowMonth+','+','+nowFirstDay+','+nowMonthDays+','+lastMonthDays);
			for( var i = lastMonthDays - nowFirstDay + 1, len = lastMonthDays; i <= len; i++) {
				daysData.push(i);
			}

			for(var j = 1, len = nowMonthDays; j <= nowMonthDays ; j++ ){
				daysData.push(j);
			}

			for(var k = 1;daysData.length < 42; k++){
				daysData.push(k);	
			}

			daysData = changeArr(daysData);
			
			var $tbody = $('#'+ this.id + ' > tbody ');
			$tbody.empty();
			for( var i = 0, rowLen = daysData.length; i < rowLen ; i++){				
				var $tr = $('<tr></tr>')
				for(var j = 0, colLen = daysData[i].length; j < colLen ; j++ ){					
					$tr.append('<td>'+ daysData[i][j] +'</td>');
					if (i*7+j < nowFirstDay) {

					}
				}
				$tbody.append($tr);
			}
			$('#'+ this.id + '>tbody td:lt('+nowFirstDay+')').addClass('lastMonth');
			$('#'+ this.id + '>tbody td:gt('+ (nowFirstDay+nowMonthDays-1) +')').addClass('nextMonth');

		},

		//创建<select>年份月份选择
		createSelect: function(){
//			var $thead = $('#'+ this.id + ' > thead ');
			var $curMonthOption = this.now.getMonth() ;
			var $curYearOption = this.now.getFullYear() - this.yearRange[0];
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
			$('#year > option:eq('+$curYearOption+'),#month > option:eq('+$curMonthOption+')').attr('selected',true);
			$

		},

		createInput: function() {
			var $input = $('<input type="text" id="calenderInput"  placeholder="点击输入日期" />');
			$('#'+ this.id ).before($input);
		},

		bindEvent: function() {
			var This = this;
			var nowDate = this.now.getDate();   //这月的第几日
			var nowYear = This.now.getFullYear();  //年份
			var nowMonth = this.now.getMonth() + 1 ;	//月份

			var nowFirstDay = new Date(nowYear + "/" + nowMonth + "/" + 1).getDay();
			$('#year,#month').on('change',function(){
				This.now = new Date($('#year').val() + '/' + $('#month').val() + '/' + 1);
				This.createTbody();
				
			});

			$('#'+ this.id + ' > tbody ').on('click','td',function(){
				if (this.className == '') {
					var nowYear = This.now.getFullYear();  //年份
					var nowMonth = This.now.getMonth() + 1 ;	//月份						
//					console.log(This.now);
					$('#'+ This.id + ' > tbody  td ').removeClass('curDate');
					$(this).addClass('curDate');
					$('#calenderInput').val(nowYear+'/'+numFormat(nowMonth)+'/'+ numFormat($(this).html() ) );	
					
					This.now =new Date ($('#calenderInput').val() );
					
				}

			});

			$('#'+ this.id + ' > tbody td:eq('+ (nowDate+nowFirstDay-1) +') ').trigger('click');
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

//	var $wrap = $('.wrap');
	var config = {
		id : 'calen',    //样式选择
		container: $('.wrap'),   //容器
		yearRange: [1900,2100]

	}
	var newCalen = new Calender(config);

	newCalen.init();


})
