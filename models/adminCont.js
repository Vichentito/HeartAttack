'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminContSchema = Schema({
		name: String,
		identifier: String,
		email: String,
		password: String,
		state: Boolean,
		role: String,
		image: String
});

module.exports = mongoose.model('AdminCont', AdminContSchema);