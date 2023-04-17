

const express = require('express');
const rutaFicha = express.Router();
const controladorFicha= require('../controllers/controllerFicha');

rutaFicha.get('/listarFichasActivas',controladorFicha.listarFichasActivas)



module.exports = rutaFicha;