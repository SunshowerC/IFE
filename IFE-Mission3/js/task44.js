


function GalleryWall(options){
	this.elem = document.querySelector(options.elem);
	this.col =options.col || 5;
	this.gap = options.gap / 2 || 10 ;
	this.init();
	// this.appendPhoto('abc');
}

GalleryWall.prototype.init = function() {
	for(var i = 0 ; i < this.col ; i++) {
		var newColumn = document.createElement('div');
		newColumn.setAttribute('class','gallery-col');
		newColumn.style.cssText = 'width:'+ 100 / this.col + '%;' +
								  'padding: 0 '  + this.gap + 'px;' ;
		// newColumn.style.width = 
		// newColumn.style.padding = '0 ' + this.gap + 'px' ;
		this.elem.appendChild(newColumn);
	}
}

GalleryWall.prototype.appendPhoto = function(photo) {
	var newPhoto = document.createElement('div');
	newPhoto.className = 'gallery-item';
	newPhoto.setAttribute('style','margin-bottom:' + this.gap * 2 + 'px');
	newPhoto.innerHTML = 
	'<div class="gallery-image">' +
		'<img src=' + photo.src + '>' +
	'</div>' +
	'<div class="gallery-item-info">' +
		'<h4 class="gallery-title">' + photo.src + '</h4>' +
		'<p class="gallery-description">' + photo.description + '</p>' +
	'</div>' ;
	this.getMinHeight().appendChild(newPhoto);
}

GalleryWall.prototype.getMinHeight = function() {
	var columns = this.elem.querySelectorAll('.gallery-col');
	var min = columns[0];
	for (var i = 1, len = columns.length; i < len; i++) {
		if (columns[i].clientHeight < min.clientHeight) {
		  min = columns[i];
		}
	}
	// console.log(min);
	return min;
}


var newGallerywall = new GalleryWall({
	elem : '.gallery',
	col: 3,
	gap: '10'

});

var img = {
	src:'./img/0.jpg',
	title:'planet',
	description: '星球'
}


var btn = document.querySelector('.btn button');
var i = 0;

btn.onclick = function() {
	img.src = './img/' + (i++) +'.jpg';
	// newGallerywall.appendPhoto(img)
	getPhoto();
}







