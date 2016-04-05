
var form = document.querySelector('.form');
var getForm = document.querySelector('.getForm');

/*
* tips: <p class = 'tips'>的标签
* obj: input元素
* stateText : validator验证后返回的字符串信息
* 函数功能：根据返回字符串信息，给input以及p添加不同的样式
 */

function setState(tips,obj,stateText) {
	obj.className ='';
	tips.className='tips ';
	console.log(stateText);
	console.log( Boolean(stateText.indexOf('正确')) );
	if ( stateText.indexOf('正确') != -1 ) {
		obj.className += 'correct';
		tips.className += 'correct';		
	}
	else {
		obj.className += 'wrong';
		tips.className += 'wrong';		
	}	
}

/*
* typeObj: formFormat 的 属性名
* 表单创建：创建label标签，并根据typeObj创建input标签元素与对应属性
 */
function createLabel(typeObj) {
	var newLabel = document.createElement('label');
	var newTips = document.createElement('p');
	newTips.className = 'tips';
	newTips.innerText = '　';
//	console.log(typeObj);
	newLabel.innerHTML = '<span>' + typeObj.label + '</span>' + '<input type="'+ typeObj.type + '" name="' + typeObj.name + '" placeholder = ' + typeObj.rules + '>';
	form.appendChild(newTips);
	form.insertBefore(newLabel,newTips)	;
}


/*
* obj: input对象
* 获取input值，并验证输入格式
 */
function inputValidation(obj){
	var tips = obj.parentNode.nextElementSibling;
	var text = trim(obj.value);
	tips.innerText = formFormat[ obj.name ].validator(text);	
	setState(tips,obj,tips.innerText);
}

/*
*点击生成表单
 */
function formFactory() {
	var creatFormBtn = getForm.getElementsByTagName('button')[0];
	var box = getForm.getElementsByTagName('input');
	var  btn = document.createElement('button');
	btn.innerText = '提　交';
	creatFormBtn.onclick = function(){
		form.innerHTML = '';
		for (var i = 0; i < box.length; i++) {
			if (box[i].checked && i == 1) {      //特殊情况，当生成密码输入框时，密码框+验证框同时添加
				createLabel( formFormat.password);
				createLabel( formFormat.valiPw);
			}
			if(box[i].checked && i != 1) {    //生成对应 输入框
				createLabel( formFormat[box[i].value] );
			}
		}
	form.appendChild(btn);		
	}
}

/*
*obj: input对象
* input获取焦点时显示提示信息
 */
function inputFocus(obj) {
	var tips = obj.parentNode.nextElementSibling;
	tips.innerText = formFormat[ obj.name ].rules;
	setState(tips,obj,'正确');
}

/*
*初始化，绑定事件
 */
function init() {
	formFactory();
	var inp = form.getElementsByTagName('input');
	var btn = document.getElementById('submit');	
	form.onclick = function(e) {
		var e = e || window.event;
		var target = e.target || e.srcElement;
		if ( target.nodeName.toLowerCase() =='input' ) {   //input的onfocus和 onblur事件绑定
			target.onfocus = function() {      //bug:第一次focus不能进入
				inputFocus(this);
			}			
			target.onblur = function() {
				inputValidation(this);
			}
		}

		if (target.nodeName.toLowerCase() == 'button' ) {  //提交按钮绑定事件
			for (var i = 0; i < inp.length; i++) {
				if(trim(inp[i].className) == 'wrong' || inp[i].className==''){
					alert('你的输入有误！');
					return true;
				}
				if(i == inp.length -1) {
					alert('提交成功.');
					return false;
				}
			}
		}
	}	
}

init();
