
const express = require('express');
const rutaEtapaPractica = express.Router();
const controladorEtapaPractica= require('../controllers/controllerEtapaPractica');

rutaEtapaPractica.get('/desplegarEtapaPractica',controladorEtapaPractica.desplegarEtapaPractica)


module.exports = rutaEtapaPractica;