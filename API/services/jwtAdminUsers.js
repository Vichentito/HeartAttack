'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'gatitosconsombrerodecopa';

exports.createTokenAdminUsers = function(adminUsers){
	var payload = {
		sub: adminUsers._id,
		name: adminUsers.name,
		identifier: adminUsers.identifier,
		email: adminUsers.email,
		state: adminUsers.state,
		role: adminUsers.role,
		image: adminUsers.image,
		iat: moment().unix,
		exp: moment().add(10, 'days').unix
	};

	return jwt.encode(payload, secret);
};
