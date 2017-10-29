'use strict'

var express = require('express');
var AdminContController = require('../controllers/adminCont');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/adminCont' });

api.get('/probando-controlador-AdminCont', AdminContController.pruebas);
api.post('/register-AdminCont', AdminContController.saveAdminCont);
api.post('/login-AdminCont', AdminContController.saveAdminCont);
api.put('/update-AdminCont/:id', md_auth.ensureAuth, AdminContController.saveAdminCont);
api.post('/upload-image-AdminCont/:id', [md_auth.ensureAuth, md_upload], AdminContController.uploadImage);
api.get('/get-image-AdminCont/:imageFile', AdminContController.getImageFile);

module.exports = api;
