


var img = {
	src:'./img/0.jpg',
	title:'planet',
	description: '图片描述信息'
}


function getPhoto(){
	var request = new XMLHttpRequest();
	var count = Math.ceil( Math.random() * 5000 );
	var url = 'http://127.0.0.1:8081/img/'+ photoNumFormat(count++);
	request.open('GET',url );
	request.send();
	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200 ) {
			// console.log(this.response);
			img.src = this.response;
			newGallerywall.appendPhoto(img)			
		}
	}
}

function photoNumFormat(num) {
	if (num < 10) {
		return '0000' + num;
	} else if( num < 100 ) {
		return '000' + num;
	} else if( num < 1000 ) {
		return '00' + num;
	} else {
		return '0' + num;
	}

}
