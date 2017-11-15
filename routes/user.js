'use strict'

var express = require('express');
var User = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users' });

api.get('/probando-controlador-users', User.pruebas);
api.post('/register-users', User.saveUser);
api.post('/login-users', User.loginUser);
api.put('/update-users/:id', md_auth.ensureAuth, User.updateUser);
api.post('/upload-image-users/:id', [md_auth.ensureAuth, md_upload], User.uploadImage);
api.get('/get-image-users/:imageFile', User.getImageFile);

module.exports = api;
