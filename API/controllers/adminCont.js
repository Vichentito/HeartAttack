'use strict'
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var AdminCont = require('../models/adminCont');
var jwt = require('../services/jwtAdminCont');


function pruebas(req, res){
	res.status(200).send({
		message: 'Probando controlador de admin de usuarios perron'
	});
}

function saveAdminCont(req, res){
	var adminCont = new AdminCont()

	var params = req.body

	console.log(params)

	adminCont.name = params.name
	adminCont.identifier = params.identifier
	adminCont.email = params.email
	adminCont.state = true
	adminCont.role = 'ROLE_ADMIN_CONT'
	adminCont.image = 'null'

	if(params.password){
		// Hashear contraseña
		bcrypt.hash(params.password, null, null, function(err, hash){
			adminCont.password = hash

			if(adminCont.name != null && adminCont.identifier != null && adminCont.email != null){
				// Guardar el adminUsers
				adminCont.save((err, adminContStored) => {
					if(err){
						res.status(500).send({message: 'Error al guardar el adminCont'})
					}else{
						if(!adminContStored){
							res.status(404).send({message: 'No se ha registrado el adminCont'})
						}else{
							res.status(200).send({adminCont: adminContStored})
						}
					}
				});

			}else{
			    res.status(200).send({message: 'Rellena todos los campos'})
			}
		})
	}else{
		res.status(200).send({message: 'Introduce la contraseña'})
	}

}

function loginAdminCont(req, res){
	var params = req.body

	var identifier  = params.identifier
	var password = params.password

	AdminCont.findOne({identifier: identifier.toLowerCase()}, (err, adminCont) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'})
		}else{
			if(!adminCont){
				res.status(404).send({message: 'El adminCont no existe'})
			}else{
				// Comprobar la contraseña
				bcrypt.compare(password, user.password, function(err, check){
					if(check){
						//devolver los datos del usuario logueado
						if(params.gethash){
							// devolver un token de jwt
							res.status(200).send({
								token: jwt.createTokenAdminCont(adminCont)
							})
						}else{
							res.status(200).send({adminCont})
						}
					}else{
						res.status(404).send({message: 'El adminCont no ha podido loguease'})
					}
				})
			}
		}
	});
}

function updateAdminCont(req, res){
	var adminContId = req.params.id
	var update = req.body

	if(adminContId != req.adminCont.sub){
	  return res.status(500).send({message: 'No tienes permiso para actualizar este adminUsers'})
	}

	AdminCont.findByIdAndUpdate(adminContId, update, (err, adminContUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el adminCont'})
		}else{
			if(!adminContUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el adminCont'})
			}else{
				res.status(200).send({adminCont: adminContUpdated})
			}
		}
	})
}

function uploadImage(req, res){
	var adminContId = req.params.id
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.image.path
		var file_split = file_path.split('\\')
		var file_name = file_split[2]

		var ext_split = file_name.split('\.')
		var file_ext = ext_split[1]

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

			AdminCont.findByIdAndUpdate(adminContId, {image: file_name}, (err, adminContUpdated) => {
				if(!adminContUpdated){
					res.status(404).send({message: 'No se ha podido actualizar el adminUsers'})
				}else{
					res.status(200).send({image: file_name, adminCont: adminContUpdated})
				}
			});

		}else{
			res.status(200).send({message: 'Extensión del archivo no valida'})
		}

	}else{
		res.status(200).send({message: 'No has subido ninguna imagen...'})
	}
}

function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './uploads/users/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}



module.exports = {
	pruebas,
	saveAdminCont,
	loginAdminCont,
	updateAdminCont,
	uploadImage,
	getImageFile
};
