'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 9091;

mongoose.connect('mongodb://localhost:27017/heartattack', (err, res) => {
	if(err){
		throw err;
	}else{
		console.log("La conexión a la base de datos está funcionando correctamente...");

		app.listen(port, function(){
			console.log("Servidor del api en http://localhost:"+port);
		});
	}
});
