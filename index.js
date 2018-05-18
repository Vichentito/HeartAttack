'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 9091;

//mongodb://root:gatitosconsombrerodecopa@ds229435.mlab.com:29435/heartattack
//'mongodb://localhost:27017/heartattack

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:gatitosconsombrerodecopa@ds229435.mlab.com:29435/heartattack',{useMongoClient: true}).then(()=>{
		console.log("La conexión a la base de datos está funcionando correctamente...");

		app.listen(port, function(){
			console.log("Servidor del api en http://localhost:"+port);
		});
	}).catch(err => console.log(err));