let express = require('express');
let rutaAutenticacion = express.Router();

let controllerAutenticacion = require('../controllers/controllerAutenticacion')

rutaAutenticacion.post('/login', controllerAutenticacion.Validar_Usuario);


rutaAutenticacion.get('/Cerrar_Sesion',controllerAutenticacion.Cerrar_Sesion);


module.exports = rutaAutenticacion;