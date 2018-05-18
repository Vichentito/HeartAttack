'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CuestionariosSchema = Schema({
		numero: Numer,
		preginta: String,
		opciones: String,
		respuesta: String
});

module.exports = mongoose.model('Cuestionario', CuestionariosSchema);