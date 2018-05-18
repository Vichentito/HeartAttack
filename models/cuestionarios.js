'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CuestionariosSchema = Schema({
		numero: Numer,
		preginta: String,
		opciones: {
			op1:String,
			op2:String,
			op3:String},
		respuesta: String
});

module.exports = mongoose.model('Cuestionario', CuestionariosSchema);