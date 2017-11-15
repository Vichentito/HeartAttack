'use strict'
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var Root = require('../models/root');
var jwt = require('../services/jwtRoot');


function pruebas(req, res){
	res.status(200).send({
		message: 'Probando controlador de root perron'
	});
}

function saveRoot(req, res){
	var root = new Root()

	var params = req.body

	console.log(params)

	root.name = params.name
	root.role = 'ROLE_ROOT'
	root.image = 'null'

	if(params.password){
		// Hashear contraseña
		bcrypt.hash(params.password, null, null, function(err, hash){
			root.password = hash

			if(root.name != null){
				// Guardar el usuario
				root.save((err, rootStored) => {
					if(err){
						res.status(500).send({message: 'Error al guardar el root'})
					}else{
						if(!rootStored){
							res.status(404).send({message: 'No se ha registrado el root'})
						}else{
							res.status(200).send({root: rootStored})
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

function loginRoot(req, res){
	var params = req.body

	var name  = params.name
	var password = params.password

	Root.findOne({name: name.toLowerCase()}, (err, root) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'})
		}else{
			if(!root){
				res.status(404).send({message: 'El root no existe'})
			}else{
				// Comprobar la contraseña
				bcrypt.compare(password, root.password, function(err, check){
					if(check){
						//devolver los datos del usuario logueado
						if(params.gethash){
							// devolver un token de jwt
							res.status(200).send({
								token: jwt.createTokenRoot(root)
							})
						}else{
							res.status(200).send({root})
						}
					}else{
						res.status(404).send({message: 'El root no ha podido loguease'})
					}
				})
			}
		}
	});
}

function updateRoot(req, res){
	var rootId = req.params.id
	var update = req.body

	if(rootId != req.root.sub){
	  return res.status(500).send({message: 'No tienes permiso para actualizar este root'})
	}

	Root.findByIdAndUpdate(rootId, update, (err, rootUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el root'})
		}else{
			if(!rootUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el root'})
			}else{
				res.status(200).send({root: rootUpdated})
			}
		}
	})
}

function uploadImage(req, res){
	var rootId = req.params.id
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.image.path
		var file_split = file_path.split('\\')
		var file_name = file_split[2]

		var ext_split = file_name.split('\.')
		var file_ext = ext_split[1]

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

			Root.findByIdAndUpdate(rootId, {image: file_name}, (err, rootUpdated) => {
				if(!rootUpdated){
					res.status(404).send({message: 'No se ha podido actualizar el root'})
				}else{
					res.status(200).send({image: file_name, root: rootUpdated})
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
	saveRoot,
	loginRoot,
	updateRoot,
	uploadImage,
	getImageFile
};
