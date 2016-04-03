var radio = document.getElementsByName('is_in_sch');
var city = document.getElementById('city');
var schInfo = {
	'北京': ['北京大学','清华大学'],
	'上海': ['复旦大学','上海交通大学','上海大学'],
	'深圳': ['深圳大学','华中科技大学']
};
/*
* 切换
 */
function isInSchool(){
	var studInfo = document.getElementsByTagName('label');
	if(radio[0].checked) {
		studInfo[2].style.display = 'block';
		studInfo[3].style.display = 'none';
	}
	if(radio[1].checked) {
		studInfo[3].style.display = 'block';
		studInfo[2].style.display = 'none';
	}	
}


function linkage() {
	var sch  = document.getElementById('school');
	sch.options.length = 0;
	for(var city_data in schInfo){
		console.log(city.options[city.selectedIndex].value);
		console.log(city_data);
		if(city.options[city.selectedIndex].value == city_data){
			var curSch = schInfo[city_data];
			for (var i = 0; i < curSch.length; i++) {
				var newOption = document.createElement('option');
				newOption.innerHTML = '<option value=' + curSch[i] + '>' + curSch[i] + '</option>';
				sch.appendChild(newOption);
			}
		}
	}

}

function init(){
	addEvent('click',radio[0],isInSchool);
	addEvent('click',radio[1],isInSchool);
	addEvent('change',city,linkage);
}

init();
