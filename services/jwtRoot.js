'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'gatitosconsombrerodecopa';

exports.createTokenRoot = function(root){
	var payload = {
		sub: root._id,
		name: root.name,
		role: root.role,
		image: root.image,
		iat: moment().unix,
		exp: moment().add(30, 'days').unix
	};

	return jwt.encode(payload, secret);
};
