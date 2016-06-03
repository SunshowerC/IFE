
var count = 10;

function getPhoto(){
	var request = new XMLHttpRequest();
	var url = 'http://127.0.0.1:8081/img/'+ (count++);
	console.log(url);
	request.open('GET',url );
	request.send();
	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200 ) {
			console.log(this.response);
		}
	}

}
