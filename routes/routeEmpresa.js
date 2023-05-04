
const express = require('express');
const rutaEmpresa = express.Router();
const controladorEmpresa= require('../controllers/controllerEmpresa');

rutaEmpresa.get('/listarEmpresasActivas',controladorEmpresa.listarEmpresasActivas)
rutaEmpresa.post('/registrarEmpresa',controladorEmpresa.registrarEmpresa)

rutaEmpresa.get('/desactivarEmpresa/:id_empresa',controladorEmpresa.desactivarEmpresa)



module.exports = rutaEmpresa;