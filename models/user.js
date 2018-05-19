'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
		nombre: String,
		userName: String,
		email: String,
		password: String,
		psswrdrecover: String,
		age: String,
		puntaje: String,
		state: Boolean,
		role: String
});

module.exports = mongoose.model('User', UserSchema);