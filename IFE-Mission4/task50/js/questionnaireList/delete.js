

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
	// var researchs = obj.paperMsg ;
	var newQuestHref = 'edit.html',
	    editQuestHref = 'edit.html',
	    checkDataHref = 'showData.html',
	    answerQuestionnaireHref = 'answerQuestionnaire.html';


	var checkState = function(item) {
		if (item == 'state') {
			switch(researchs[i].state) {
				case 1 : return  '<td >未发布</td>' +
					                '<td colspan="2">' +
					                  '<a href=' + checkDataHref + ' class="editQuest">编辑</a> ' +
									  '<a  class="deleteQuest" >删除</a> ' +
									  '<a href='+answerQuestionnaireHref+' class="checkQuest" \
								 style="pointer-events:none;color:#ddd;border-color:#ddd;">查看问卷</a>';
				case 2 : return  '<td class="active">发布中</td>' +
									'<td colspan="2">' +
									  '<a  class="deleteQuest" >删除</a> ' +
									  '<a href=' + checkDataHref + ' class="checkData">查看数据</a> ' +
									  '<a href=' + answerQuestionnaireHref + ' class="checkQuest" >查看问卷</a> ' ;
				case 3 : return  '<td >已结束</td>' +
									'<td colspan="2">' +
									  '<a href=' + checkDataHref + ' class="editQuest">编辑</a> ' +
									  '<a  class="deleteQuest" >删除</a> ' +
					  				  '<a href=' + checkDataHref + ' class="checkData">查看数据</a>' ;
			}

		}
	}

	var changeState = function(researchs) {
		 var nowDate = new Date();
		 for (var i = 0,len = researchs.length; i < len ;i++) {
		 	var deadline =  new Date(researchs[i].deadline);
		 	if (deadline < nowDate) {
		 		researchs[i].state = 3 ;
		 	}
		 }
	}	

	changeState(researchs);


	$container.append(
		'<table class="questionnaireTab">' +
			'<thead>' +
				'<tr>' +
					'<th></th>' +
					'<th>标题</th>' +
					'<th>截止时间</th>' +
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
						'<a  class="deleteQuests">删除</a>' +
					'</td>' +
				'</tr>' +
			'</tfoot>' +
		'</table>');

	var $tbody = $container.find('.questionnaireTab tbody');
	for (var i = 0, len = researchs.length; i < len; i++) {
		$tbody.append(
			'<tr>' +
				'<td><input type="checkbox" id=' +researchs[i].researchId + ' /></td>' +
				'<td><label for=' + researchs[i].researchId + '>' + researchs[i].researchTitle +'</label></td>' +
				'<td>'+ researchs[i].deadline +'</td>' +
					checkState('state')  +
/*				 '<td colspan="2">' +
					'<a href=' + editQuestHref + ' class="editQuest">编辑</a> ' +
					'<a href="##" class="deleteQuest" >删除</a> ' +
					 checkState('check')  +*/
				'</td>' +
			'</tr>');
	}

	checkboxEvent();   //checkbox 全选事件绑定


	/*
	*弹出框设置
	 */
	$('.questionnaireTab ').on('click','a',function(e){
		var This = this;  //This 为 <a>
		var thisTr = $(This).parents('tr'); 

		if ( this.className.indexOf('deleteQuest') > -1 ) {
			$('#dialog-modal').dialog({
				title: '系统提示',
				content: '确定要删除此问卷？',
				height: 200,
				button: {
					'确定': function(){
						if (e.target.className == 'deleteQuest') {  // tbody 的删除按钮
							$(This).parents('tr').remove();
							var thisQuestId = thisTr.find('input').attr('id');
							researchs.forEach(function(item,index,array){
								if (thisQuestId == item.researchId ) {
									// delete researchs[index];
									researchs.splice(index,1);
									localStorage.setItem('paperMsg',JSON.stringify(researchs) ) ;
									console.log(researchs)
								}
							});

						} else {   //tfoot 的删除按钮
							var $checkedInput = $(".questionnaireTab tbody input:checked");
							$checkedInput.parents('tr').remove();
							$checkedInput.each(function(index,element){
								researchs.forEach(function(item,index,array){
									if (element.id == item.researchId) {
										researchs.splice(index,1);
										localStorage.setItem('paperMsg',JSON.stringify(researchs) ) ;
									}
								});
							});
						}
					},
					'取消': function(){
					}
				}		
			})			
		} 

		switch(this.className) {
			case 'editQuest' : 
				localStorage.activeResearchId = thisTr.find('input').attr('id');
				window.location.href = editQuestHref;
				break;
			case 'checkData' :
				localStorage.activeResearchId = thisTr.find('input').attr('id');
				window.location.href = checkDataHref;
				break;		
			case 'checkQuest':
				localStorage.activeResearchId = thisTr.find('input').attr('id');
				window.location.href = answerQuestionnaireHref;	
				break;
			case 'newQuest' :
				localStorage.activeResearchId = '' ;
				window.location.href = newQuestHref;			
				break;
		}


		e.preventDefault();
		e.stopPropagation();		
	});			
}



	


