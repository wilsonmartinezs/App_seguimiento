

const express = require('express');
const rutaMatricula = express.Router();
const controladorMatricula= require('../controllers/controllerMatricula');

rutaMatricula.get("/matriculaAprendiz",controladorMatricula.matriculaAprendiz);
rutaMatricula.get('/listarAprendicesEtapaPractica',controladorMatricula.listarAprendicesEtapaPractica)
rutaMatricula.get("/listarAprendicesMatriculados",controladorMatricula.listarAprendicesMatriculados);
rutaMatricula.get("/listarMunicipios",controladorMatricula.listarMunicipios);
rutaMatricula.post("/registrarMatricula",controladorMatricula.registrarMatricula);
rutaMatricula.get("/buscarAprendiz/:identificacion",controladorMatricula.buscarAprendiz);


module.exports = rutaMatricula;