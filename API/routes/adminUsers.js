'use strict'

var express = require('express');
var AdminUsersController = require('../controllers/adminUsers');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/adminUsers' });

api.get('/probando-controlador-AdminUsers', AdminUsersController.pruebas);
api.post('/register-AdminUsers', AdminUsersController.saveAdminUsers);
api.post('/login-AdminUsers', AdminUsersController.loginAdminUsers);
api.put('/update-AdminUsers/:id', md_auth.ensureAuth, AdminUsersController.updateAdminUsers);
api.post('/upload-image-AdminUsers/:id', [md_auth.ensureAuth, md_upload], AdminUsersController.uploadImage);
api.get('/get-image-AdminUsers/:imageFile', AdminUsersController.getImageFile);

module.exports = api;
