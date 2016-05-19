

var checkboxEvent = function(){
	var $questBox = $('.questionnaireTab tbody input');
	$('#checkedAll').on('click',function(){
		$questBox.prop('checked',this.checked)  ;
		// $questBox.attr('checked',this.checked)  ;
		// console.log($(".questionnaireTab tbody input:checked").length)

	})

	$questBox.on('click',function(){
		// console.log($(".questionnaireTab tbody input:checked").length)
		$("#checkedAll").prop("checked",
			$questBox.length == $(".questionnaireTab tbody input:checked").length ? 'checked' : '');
	})		
}


/*
* 加载时渲染表格
 */
var loadedRender = function($container, researchs) {
	var newQuestHref = '#',
	    editQuestHref = '#',
	    checkQuestHref = '#',
	    checkDataHref = '#';

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
				function(){
					return researchs[i].state == '发布中' ? '<td class="active">'+ researchs[i].state +'</td>' : '<td>'+ researchs[i].state +'</td>';
				}()
				+ '<td colspan="2">' +
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
					if (e.target.className == 'deleteQuest') {  // tbody 的删除按钮
						$(This).parents('tr').remove();
						var thisQuestId = $(This).parents('tr').find('input').attr('id');
						researchs.forEach(function(item,index,array){
							if (thisQuestId == item.researchID ) {
								// delete researchs[index];
								researchs.splice(index,1);
								// console.log(researchs)
							}
						});

					} else {   //tfoot 的删除按钮
						var $checkedInput = $(".questionnaireTab tbody input:checked");
						$checkedInput.parents('tr').remove();
						$checkedInput.each(function(index,element){
							researchs.forEach(function(item,index,array){
								if (element.id == item.researchID) {
									researchs.splice(index,1);
								}
							})
						})
					}
				},
				'取消': function(){
				}
			}		
		})
		e.stopPropagation();		
	})			
}

	


