

const express = require('express');
const rutaMatricula = express.Router();
const controladorMatricula= require('../controllers/controllerMatricula');

rutaMatricula.get('/listarTodosAprendices',controladorMatricula.listarTodosAprendices)
//rutaMatricula.get("/buscarAprendizMatricula/:idMatricula",controladorMatricula.buscarAprendizMatricula);
rutaMatricula.get("/listarMunicipios",controladorMatricula.listarMunicipios);
rutaMatricula.post("/registrarMatricula",controladorMatricula.registrarMatricula);
rutaMatricula.get("/buscarAprendiz/:identificacion",controladorMatricula.buscarAprendiz);


module.exports = rutaMatricula;