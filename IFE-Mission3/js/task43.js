


	function Gallery(config) {
		this.container = config.container;
		this.gallery = config.gallery;
		this.galleryContainerSize = config.galleryContainerSize || [1200,900];
		this.createGallery();
	}

	Gallery.prototype = {

		createGallery: function() {
			var galleryDiv = document.createElement('div');
			var len = this.gallery.length;
			galleryDiv.style.width = this.galleryContainerSize[0] + 'px';
			galleryDiv.style.height = this.galleryContainerSize[1] + 'px';
			galleryDiv.id = 'gallery-' + len;
			galleryDiv.className = 'galleryWall';
			for (var i = 0; i < len; i++) {
				var img = document.createElement('img');
				img.src = this.gallery[i][0];
				img.alt = this.gallery[i][1];
				galleryDiv.appendChild(img);
			}
			this.container.appendChild(galleryDiv);
		}
	}

/*
*@param {element} container :容器
*@param {array}  galleryContainerSize: 图片墙大小
*@param {array}  gallery: 图片路径，alt信息
 */



/*
	var config = {
		container: document.querySelector('.wrap'),
		galleryContainerSize: [800,600],
		gallery:[
			["img/nature.jpg",'自然'],
			["img/planet1.jpg",'星球1'],
			["img/planet2.jpg",'星球2'],
			["img/planet3.jpg",'星球3'],
			["img/DREAM WORLD9.jpg",'唯美世界'],
			["img/planet4.jpg",'星球4']
		]
	}	
	var newGallery5 = new Gallery(config);
*/			



