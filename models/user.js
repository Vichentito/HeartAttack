'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
		name: String,
		userName: String,
		email: String,
		password: String,
		age: String,
		state: Boolean,
		role: String,
		image: String
});

module.exports = mongoose.model('User', UserSchema);