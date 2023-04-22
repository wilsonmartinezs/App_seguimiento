const express = require('express');
const rutaPersona = express.Router();

const controladorPersona= require('../controllers/controllerPersona');


//rutaPersona.post("/actualizarAprendiz",controladorPersona.actualizarAprendiz);
rutaPersona.post("/registrarAprendiz",controladorPersona.registrarAprendiz);






module.exports = rutaPersona;