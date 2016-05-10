
;$(function(){

	function Pop(options) {
		for(var name in options) {
			this[name] = options[name];
		}
		// console.log(this);
	//	this.init();
	}

	Pop.prototype = {
		init: function() {
			this.createMask();
			this.createPopup();
			this.bindEvent();
		},

		createMask: function() {
			if (this.modal) {
				$('body').append('<div class="pop-up-mask"></div>')
			}
		},

		createPopup: function() {
			var This = this;
			This.popup.append(
					'<div class="popupPanel">' +
						'<h2 class="pop-up-title">' + this.title + '</h2>'+
						'<div class="pop-up-content" style="height:' + (This.height-90) +'px" >' + this.content + '</div>' +
						'<div class="pop-up-button">' + 
						'</div>' +
					'</div>'
				);
			var btnGroup = This.popup.find('.pop-up-button');
			
			for( btnName in This.button) {
				var $btn = $('<button></button') ;
				
				$btn.html(btnName) ;

				(function(btnName){
					$btn.on('click', function(e){
						This.button[btnName]();
						This.close();
						e.stopPropagation() ;  					
					});					
				}(btnName));

				btnGroup.append($btn);
			}
		},

		close: function() {
			this.popup.empty();
			$('.pop-up-mask').remove();
			this.unbindEvent();
		},

		unbindEvent: function() {
			$(document).off('click');
		},

		bindEvent: function() {
			var This = this;
			/*拖拽事件*/
			if (this.drag) {

			}

			$(document).on('click',function(){
				This.close();
			});

			This.popup.on('click',function(e){
				e.stopPropagation();
			})

		}


	}

	$.fn.extend({
		dialog:function(options) {
			var defaultOptions = {
				popup: $(this),
				width: '20%' ,
				height: 'auto' ,
				title: '',
				body: '',
				button: {
					'确定': function(){},
					'取消': function(){}
				},
				modal: true,
				drag: true
			}
			$.extend(defaultOptions,options);

			var newPop = new Pop(defaultOptions);
			newPop.init();
			return $(this) ; //链式操作
		}
	})

	var checkboxEvent = function(){
		var $questBox = $('.questionnaireTab tbody input');
		$('#checkedAll').on('click',function(){
			$questBox.prop('checked',this.checked)  ;
			// $questBox.attr('checked',this.checked)  ;
			// console.log($(".questionnaireTab tbody input:checked").length)

		})

		$questBox.on('click',function(){
			console.log($(".questionnaireTab tbody input:checked").length)
			$("#checkedAll").prop("checked",
				$questBox.length == $(".questionnaireTab tbody input:checked").length ? 'checked' : '');
		})		
	}

	var loadedRender = function($container, researchs) {
		var newQuestHref = '#',
		    editQuestHref = '#',
		    checkQuestHref = '#',
		    checkDataHref = '#'

		$container.append(
			'<table class="questionnaireTab">' +
				'<thead>' +
					'<tr>' +
						'<th></th>' +
						'<th>标题</th>' +
						'<th>时间</th>' +
						'<th>状态</th>' +
						'<th>操作</th>' +
						'<th><a href=' + newQuestHref + ' class="newQuest">╋ 新建问卷</a></th>' +
					'</tr>' +
				'</thead>' +
				'<tbody>' +
				'</tbody>' +
				'<tfoot>' +
					'<tr>' +
						'<td><input type="checkbox" id="checkedAll" /></td>' +
						'<td><label for="checkedAll">全选</label></td>' +
						'<td colspan="4">' +
							'<a href="#" class="deleteQuests">删除</a>' +
						'</td>' +
					'</tr>' +
				'</tfoot>' +
			'</table>');

		var $tbody = $container.find('.questionnaireTab tbody');
		for (var i = 0, len = researchs.length; i < len; i++) {
			$tbody.append(
				'<tr>' +
					'<td><input type="checkbox" id=' +researchs[i].researchID + ' /></td>' +
					'<td><label for=' + researchs[i].researchID + '>' + researchs[i].researchTitle +'</label></td>' +
					'<td>'+ researchs[i].deadline +'</td>' +
					'<td>' + researchs[i].state +'</td>' +
					'<td colspan="2">' +
						'<a href=' + editQuestHref + '>编辑</a> ' +
						'<a href="##" class="deleteQuest" >删除</a> ' +
						'<a href="#">' + '查看问卷' + '</a>' +
					'</td>' +
				'</tr>');

		}

		checkboxEvent();   //checkbox 全选事件绑定

		/*
		*弹出框设置
		 */
		$('.questionnaireTab ').on('click','a[class*="deleteQuest"]',function(e){
			var This = this;  //This 为 <a>
			var thisTr = $(This).parents('tr'); 
			$('#dialog-modal').dialog({
				title: '系统提示',
				content: '确定要删除此问卷？',
				height: 200,
				button: {
					'确定': function(){
						if (e.target.className == 'deleteQuest') {
							$(This).parents('tr').remove();
							console.log($(This).parents('tr').find('input').attr('id'));
							var thisQuestId = $(This).parents('tr').find('input').attr('id');
							researchs.forEach(function(item,index,array){
								if (thisQuestId == item.researchID ) {
									console.log(item)
									delete researchs[index];
								}
							})
							// delete researchs[This.index];
							console.log(researchs);

							/*
							
							 */
						} else {
							$(".questionnaireTab tbody input:checked").parents('tr').remove();
						}
					},
					'取消': function(){
					}
				}		
			})
			e.stopPropagation();		
		})			
	}

	/*
	模拟数据
	 */
	var questionnaire1 = {
	        researchID :  'q1',
	        researchTitle : '问卷',
	        deadline : '2016-3-24',
	        state : '已结束', // 1.正在进行  2.未发布  3.已经结束  		
	},
		questionnaire2 = {
	        researchID :  'q2',
	        researchTitle : '于XXX的调查问卷',
	        deadline : '2016-3-20',
	        state : '发布中', // 1.正在进行  2.未发布  3.已经结束        
	    },
	    questionnaire3 = {
	        researchID :  'q3',
	        researchTitle : '关XX的调查问卷',
	        deadline : '2016-3-27',
	        state : '未发布', // 1.正在进行  2.未发布  3.已经结束        
	    };
	var researchs = [];
	researchs[0] = questionnaire1;
	researchs[1] = questionnaire2;
	researchs[2] = questionnaire3;

							console.log(researchs);

	
	loadedRender($('.questionnaireList'),researchs); //表格渲染

})

