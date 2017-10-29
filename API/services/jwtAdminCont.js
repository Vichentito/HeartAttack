'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'gatitosconsombrerodecopa';

exports.createTokenAdminCont = function(adminCont){
	var payload = {
		sub: adminCont._id,
		name: adminCont.name,
		identifier: adminCont.identifier,
		email: adminCont.email,
		state: adminCont.state,
		role: adminCont.role,
		image: adminCont.image,
		iat: moment().unix,
		exp: moment().add(10, 'days').unix
	};

	return jwt.encode(payload, secret);
};
