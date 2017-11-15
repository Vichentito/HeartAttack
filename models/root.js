'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RootSchema = Schema({
		name: String,
		password: String,
		role: String,
		image: String
});

module.exports = mongoose.model('Root', RootSchema);
