
;$(function(){

	function Pop(options) {
		for(var name in options) {
			this[name] = options[name];
		}
		console.log(this);
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
						console.log(btnName);
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


	/*
	*弹出框设置
	 */
	$('.questionnaireTab ').on('click','a[class*="deleteQuest"]',function(e){
		var This = this;
		$('#dialog-modal').dialog({
			title: '系统提示',
			content: '内容',
			height: 200,
			button: {
				'确定': function(){
					console.log($(This).parents('tr'));
					if (e.target.className == 'deleteQuest') {
						$(This).parents('tr').remove();
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


})


