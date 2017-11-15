'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 9091;

//mongodb://root:gatitosconsombrerodecopa@ds229435.mlab.com:29435/heartattack
//'mongodb://localhost:27017/heartattack

mongoose.connect('mongodb://root:gatitosconsombrerodecopa@ds229435.mlab.com:29435/heartattack', (err, res) => {
	if(err){
		throw err;
	}else{
		console.log("La conexión a la base de datos está funcionando correctamente...");

		app.listen(port, function(){
			console.log("Servidor del api en http://localhost:"+port);
		});
		app.get('/', (req,res){
			res.redirect('/api/probando-controlador-users')
		})
	}
});
