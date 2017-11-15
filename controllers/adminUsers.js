'use strict'
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var AdminUsers = require('../models/AdminUsuarios');
var jwt = require('../services/jwtAdminUsers');


function pruebas(req, res){
	res.status(200).send({
		message: 'Probando controlador de admin de usuarios perron'
	});
}

function saveAdminUsers(req, res){
	var adminUsers = new AdminUsers()

	var params = req.body

	console.log(params)

	adminUsers.name = params.name
	adminUsers.identifier = params.identifier
	adminUsers.email = params.email
	adminUsers.state = true
	adminUsers.role = 'ROLE_ADMIN_USERS'
	adminUsers.image = 'null'

	if(params.password){
		// Hashear contraseña
		bcrypt.hash(params.password, null, null, function(err, hash){
			adminUsers.password = hash

			if(adminUsers.name != null && adminUsers.identifier != null && adminUsers.email != null){
				// Guardar el adminUsers
				adminUsers.save((err, adminUsersStored) => {
					if(err){
						res.status(500).send({message: 'Error al guardar el adminUsers'})
					}else{
						if(!adminUsersStored){
							res.status(404).send({message: 'No se ha registrado el adminUsers'})
						}else{
							res.status(200).send({adminUsers: adminUsersStored})
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

function loginAdminUsers(req, res){
	var params = req.body

	var identifier  = params.identifier
	var password = params.password

	AdminUsers.findOne({identifier: identifier.toLowerCase()}, (err, adminUsers) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'})
		}else{
			if(!adminUsers){
				res.status(404).send({message: 'El adminUsers no existe'})
			}else{
				// Comprobar la contraseña
				bcrypt.compare(password, user.password, function(err, check){
					if(check){
						//devolver los datos del usuario logueado
						if(params.gethash){
							// devolver un token de jwt
							res.status(200).send({
								token: jwt.createTokenAdminUsers(adminUsers)
							})
						}else{
							res.status(200).send({adminUsers})
						}
					}else{
						res.status(404).send({message: 'El adminUsers no ha podido loguease'})
					}
				})
			}
		}
	});
}

function updateAdminUsers(req, res){
	var adminUsersId = req.params.id
	var update = req.body

	if(adminUsersId != req.adminUsers.sub){
	  return res.status(500).send({message: 'No tienes permiso para actualizar este adminUsers'})
	}

	AdminUsers.findByIdAndUpdate(adminUsersId, update, (err, adminUsersUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el adminUsers'})
		}else{
			if(!adminUsersUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el adminUsers'})
			}else{
				res.status(200).send({adminUsers: adminUsersUpdated})
			}
		}
	})
}

function uploadImage(req, res){
	var adminUsersId = req.params.id
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.image.path
		var file_split = file_path.split('\\')
		var file_name = file_split[2]

		var ext_split = file_name.split('\.')
		var file_ext = ext_split[1]

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

			AdminUsers.findByIdAndUpdate(adminUsersId, {image: file_name}, (err, adminUsersUpdated) => {
				if(!adminUsersUpdated){
					res.status(404).send({message: 'No se ha podido actualizar el adminUsers'})
				}else{
					res.status(200).send({image: file_name, adminUsers: adminUsersUpdated})
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
	saveAdminUsers,
	loginAdminUsers,
	updateAdminUsers,
	uploadImage,
	getImageFile
};
