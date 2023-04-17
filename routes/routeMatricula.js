

const express = require('express');
const rutaMatricula = express.Router();
const controladorMatricula= require('../controllers/controllerMatricula');

rutaMatricula.get('/listarTodosAprendices',controladorMatricula.listarTodosAprendices)
rutaMatricula.get("/buscarAprendizMatricula/:idMatricula",controladorMatricula.buscarAprendizMatricula);
rutaMatricula.get("/listarMunicipios",controladorMatricula.listarMunicipios);




module.exports = rutaMatricula;