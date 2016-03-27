
/*  
*aqiData,存储用户输入的空气指数数据
*/
var aqiData = new Array();


function trim(str){
	return str.replace(/\s/g,"");
}

/*
从输入框中获取数据，并增加到aqiData中
 */
function addAqiData () {
	var city_name = document.getElementById("aqi-city-input").value;
	var aqi_value = document.getElementById("aqi-value-input").value;
	city_name = trim(city_name);
	aqi_value = trim(aqi_value);
	var city_reg =  /^[A-Za-z\u4e00-\u9fa5]{0,}$/;
	var value_reg = /^[\d]*$/;
	if(city_name==""||aqi_value==""){alert("请输入信息"); return false;}
	if(!city_reg.test(city_name) )  {alert("城市输入错误");return false;}
	if(!value_reg.test(aqi_value) ) {alert("空气指数输入错误");return false;}
	for (var i = 0; i < aqiData.length; i++) {
		if(city_name == aqiData[i][0]) return false;
	}
	aqiData.push([city_name,aqi_value]);
}

/*
渲染aqi-table表格；
 */

function renderAqiList() {
	var tab = document.getElementById("aqi-table");
	var tab_body = tab.getElementsByTagName("tbody")[0];
	tab_body.innerHTML = "";    //清空
	for (var i = 0; i < aqiData.length; i++) {
		var tb_tr = document.createElement("tr");
		tb_tr.innerHTML = "<td>"+aqiData[i][0]+"</td>"+"<td>"+aqiData[i][1]+"</td>"+"<td><button>删除</button></td>";
		var del_btn = tb_tr.getElementsByTagName("button")[0];
		del_btn.onclick = function(){ 
			delBtnHandle(this)
			};
		tab_body.appendChild(tb_tr);
	}
}

/*
点击add-Btn时 的处理逻辑
获取用户输入，更新数据，
 */
function addBtnHandle(){
	addAqiData();
	renderAqiList();
}

/*
点击删除按钮的时候的处理逻辑
获取被删除城市，删除数据,更新数据；
 */
function delBtnHandle(obj) {

	var tr_index = obj.parentNode.parentNode.rowIndex;
	console.log(tr_index-1);
	aqiData.splice(tr_index-1,1);	
	renderAqiList();
//	console.log(del_btn[1].parentNode.parentNode.rowIndex);
//	document.write(del_btn[0].parentNode.rowIndex);
}

function init(){
	var add_btn = document.getElementById("add-btn");
	add_btn.onclick = addBtnHandle;	

/*	var tab = document.getElementById("aqi-table");
	var tab_body = tab.getElementsByTagName("tbody")[0];
	var del_btn = tab_body.getElementsByTagName("button");*/	
/*	for (var i = 0; i < del_btn.length; i++) {
//		del_btn[i].onclick = delBtnHandle;
		del_btn[i].addEvent('click',delBtnHandle);
	}*/
}

init();
