

const express = require('express');
const rutaSeguimiento = express.Router();
const controladorSeguimiento= require('../controllers/controllerSeguimiento');

rutaSeguimiento.get('/seguimientoAprendiz',controladorSeguimiento.seguimientoAprendiz)
rutaSeguimiento.get('/listarEstadoSeguimientos',controladorSeguimiento.listarEstadoSeguimientos)




module.exports = rutaSeguimiento;