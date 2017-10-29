'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var user_routes = require('./routes/user');
var root_routes = require('./routes/root');
var adminUsers_routes = require('./routes/adminUsers');
var adminCont_routes = require('./routes/adminCont');


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// configurar cabeceras http
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
	next()
})

// rutas base
app.use('/api', user_routes)
app.use('/api', root_routes)
app.use('/api', adminUsers_routes)
app.use('/api', adminCont_routes)


module.exports = app;
