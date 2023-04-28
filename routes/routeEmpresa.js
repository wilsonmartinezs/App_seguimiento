
const express = require('express');
const rutaEmpresa = express.Router();
const controladorEmpresa= require('../controllers/controllerEmpresa');

rutaEmpresa.get('/listarEmpresasActivas',controladorEmpresa.listarEmpresasActivas)

module.exports = rutaEmpresa;