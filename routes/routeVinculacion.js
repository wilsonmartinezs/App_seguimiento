


const express = require('express');
const rutaFicha = express.Router();
const controladorVinculacion= require('../controllers/controllerVinculacion');

rutaFicha.get('/listarInstructoresVinculados',controladorVinculacion.listarInstructoresVinculados)



module.exports = rutaFicha;