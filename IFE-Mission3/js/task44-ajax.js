



/*
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
*/

/*
CORS跨域请求，不行？
function createCORSRequest(method,url) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr ) {
		xhr.open(method, url, true);
	} else if(typeof XDomainRequest != "undefined") {
		xhr = new XDomainRequest();
		xhr.open(method, url);

	} else {
		xhr = null;
	}
	return xhr;

}

function getPhoto(){

	var count = Math.ceil( Math.random() * 700 );
	var url = 'http://www.tngou.net/tnfs/api/show?id='+ (count++);
	console.log(url)
	var request = createCORSRequest('GET',url);
	console.log(request)
	if (request) {
		request.onload = function () {
			console.log(request.responseText);
		}
		request.send();
	}

}

*/


//jsonp 获取数据
function getJSONP(url,callback) {
	var cbnum = "cb" + getJSONP.counter++;
	var cbname = "getJSONP." + cbnum;

	if (url.indexOf("?") == -1) {
		url += "?callback=" + cbname;
	} else {
		url += "&callback=" + cbname;
	}

	var script = document.createElement("script");
	getJSONP[cbnum] = function (response) {
		try {
			callback(response);
		}
		finally {
			delete getJSONP[cbnum];
			script.parentNode.removeChild(script);
		}
	};

	script.src = url;
	document.body.appendChild(script);
}
getJSONP.counter = 0;




var photoAPI = {
	url: "http://www.tngou.net/tnfs/api/list?",
	id: 0,
	page: 1
}

function addPhoto(galleryWall) {

	getJSONP(photoAPI.url + "id=" + photoAPI.id + "&page=" + photoAPI.page++ ,function (response) {
		//  var res = JSON.stringify(response)
		// console.log(response.tngou)

		var list = response.tngou ;
		if (list.length == 0) {
			photoAPI.id++;
			photoAPI.page = 1;
			return;
		}
		list.forEach(function (item) {
			galleryWall.appendPhoto({
				src: "http://tnfs.tngou.net/image" + item.img,
				title: item.title ,
				desciption: ''
			});
		});
	});
}








/*

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
*/
