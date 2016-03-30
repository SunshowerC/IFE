/*
onchange事件发生后，将该城市的数据处理分别放置在chartData.date_aqi;
chartData.week_aqi;chartDate.month_aqi;然后将渲染更新。
-------by 陈伟钰，2016-03-27
 */



/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};


var color = ['#ccffff','#ffffcc','#0066cc','#99cc66','#ffcccc','#99cc66','#cc3333','#ffff66','#666666','#996699'];

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}


/**
 * 渲染图表
 */
function renderChart() {
//  var city = pageState[now]
  
  var chart = document.getElementsByClassName("aqi-chart-wrap")[0];
  chart.innerHTML = "";
  switch(pageState.nowGraTime){
    case "day":
      for(var date in chartData.date_aqi){
        data = chartData.date_aqi[date];
        var colume = document.createElement("div");
        colume.style.backgroundColor = color[ Math.ceil(Math.random() * 9) ];
        colume.style.height = data+'px';
        colume.style.width = "1%";
        chart.appendChild(colume);     
        colume.title = date + "\n" + "Aqi：" + chartData.date_aqi[date]   ;
      }
      break;

    case "week":
      for(var date in chartData.week_aqi){
        data = chartData.week_aqi[date];
        var colume = document.createElement("div");
        colume.style.backgroundColor = color[ Math.ceil(Math.random() * 9) ];
        colume.style.height = data+'px';
        colume.style.width = "6%";
        chart.appendChild(colume);  
        colume.title = date + "\n" + "Aqi：" + chartData.week_aqi[date]   ;      
      }    
      break;

    case "month":
      for(var date in chartData.month_aqi){
        data = chartData.month_aqi[date];
        var colume = document.createElement("div");
        colume.style.backgroundColor = color[ Math.ceil(Math.random() * 9) ];
        colume.style.height = data+'px';
        colume.style.width = "30%";
        chart.appendChild(colume);       
        colume.title = date + "\n" + "Aqi：" + chartData.month_aqi[date]   ; 
      }
      break;                

  }

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  var radio = document.getElementsByName("gra-time");      // 确定是否选项发生了变化 
  for (var i = 0; i < radio.length; i++) {
    if( radio[i].checked){
      pageState.nowGraTime = radio[i].value;
//      console.log(pageState.nowGraTime);
   }
  }
                                                  // 设置对应数据

  renderChart();                                          // 调用图表渲染函数
}


/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
                                              // 确定是否选项发生了变化 
  var select = document.getElementById("city-select");
  // 设置对应数据
  pageState.nowSelectCity = select.options[select.selectedIndex].value;
  initAqiChartData();
  renderChart();// 调用图表渲染函数
//  console.log(pageState.nowSelectCity);
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var radio = document.getElementsByName("gra-time"); 
  for (var i = 0; i < radio.length; i++) {
    radio[i].onchange = graTimeChange; 
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项 
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
   var select = document.getElementById("city-select");
   select.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中

  var d = new Date("2016-01-01");
 
  chartData.date_aqi = aqiSourceData[pageState.nowSelectCity];
  chartData.week_aqi = {};
  chartData.month_aqi = {};
//  console.log(chartData.date_aqi);


  //周平均数存储到chartData.week_aqi;
  var i=0,week=0,sum = 0;
  for(var date in chartData.date_aqi){
    sum += chartData.date_aqi[date];
//    console.log(sum);
    i++;
    if(!(i%7)){
      chartData.week_aqi['第'+(i/7)+'周']= parseInt(sum/7);
      sum = 0;
//      console.log(i);
 //   console.log(chartData.week_aqi);
    }
  }
  //若天数不为7的倍数，最后一周不足7天时的处理
  if(i%7) chartData.week_aqi['第'+(parseInt(i/7)+1)+'周']= parseInt( sum/(i%7) );

  var month=0;i = 0;
  for(var date in chartData.date_aqi){
    var d=new Date(date);
    d.setDate(d.getDate()+1);
    i++;
    sum += chartData.date_aqi[date];

    if(d.getMonth()!=month){
      chartData.month_aqi['第'+(month+1)+'月'] = parseInt(sum/i);
      console.log(i);
      console.log(chartData.month_aqi);
      month++;sum = 0;i = 0;      
    }
  }

  //console.log(chartData);
  renderChart();
}


/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  console.log(chartData);

}

init();