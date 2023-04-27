
const express = require('express');
const rutaEtapaPractica = express.Router();
const controladorEtapaPractica= require('../controllers/controllerEtapaPractica');

rutaEtapaPractica.get('/desplegarEtapaPractica',controladorEtapaPractica.desplegarEtapaPractica)
rutaEtapaPractica.get('/nuevaEtapaPractica/:idMatricula',controladorEtapaPractica.nuevaEtapaPractica)

rutaEtapaPractica.post('/actualizarEtapaPractica',controladorEtapaPractica.actualizarEtapaPractica)

rutaEtapaPractica.post('/cargarArchivo',controladorEtapaPractica.cargarDocumento,controladorEtapaPractica.cargarArchivo)



module.exports = rutaEtapaPractica;