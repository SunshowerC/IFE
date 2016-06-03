var express = require('express');
var app = express();
app.use(express.static('public'));

app.get('/img/:id',function(req,res){
	console.log(req.params.id);
	res.send('http://img.sccnn.com/bimg/339/'+ req.params.id +'.jpg');
})

var server = app.listen(8081,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
