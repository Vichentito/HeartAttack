'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RootSchema = Schema({
		name: 'ROOT',
		password: String,
		role: 'root',
		image: String
});

module.exports = mongoose.model('Root', RootSchema);