'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InfoSchema = Schema({
		introduccion: {
			temas:{
				titulo:String,
				contenido:String
			}
		},
		marcohistorico: {
			temas:{
				titulo:String,
				contenido:String
			}
		},
		morfologiacorazon: {
			temas:{
				titulo:String,
				contenido:String
			}
		},
		funcionamientocorazon: {
			temas:{
				titulo:String,
				contenido:String
			}
		},
		corazonysalud: {
			temas:{
				titulo:String,
				contenido:String
			}
		},
		avancesrecientes: {
			temas:{
				titulo:String,
				contenido:String
			}
		},
		
});

module.exports = mongoose.model('Info', InfoSchema);