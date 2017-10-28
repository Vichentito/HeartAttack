'use strict'

var express = require('express');
var RootController = require('../controllers/root');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/root' });

api.get('/probando-controlador-root', RootController.pruebas);
api.post('/register-user', RootController.saveRoot);
api.post('/login-user', RootController.loginRoot);
api.put('/update-user/:id', md_auth.ensureAuth, RootController.updateRoot);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], RootController.uploadImage);
api.get('/get-image-user/:imageFile', RootController.getImageFile);

module.exports = api;
