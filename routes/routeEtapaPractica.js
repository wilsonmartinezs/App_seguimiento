
const express = require('express');
const rutaEtapaPractica = express.Router();
const controladorEtapaPractica= require('../controllers/controllerEtapaPractica');

rutaEtapaPractica.get('/desplegarEtapaPractica',controladorEtapaPractica.desplegarEtapaPractica)
rutaEtapaPractica.get('/nuevaEtapaPractica/:idMatricula',controladorEtapaPractica.nuevaEtapaPractica)

rutaEtapaPractica.post('/actualizarEtapaPractica',controladorEtapaPractica.actualizarEtapaPractica)

rutaEtapaPractica.post('/cargarArchivo',controladorEtapaPractica.cargarDocumento,controladorEtapaPractica.cargarArchivo)

rutaEtapaPractica.post('/asignarInstructor',controladorEtapaPractica.asignarInstructor)

rutaEtapaPractica.get('/listarInstructoresSeguimiento',controladorEtapaPractica.listarInstructoresSeguimiento)

rutaEtapaPractica.get('/desactivarAsignacion/:id_asignacion',controladorEtapaPractica.desactivarAsignacion)

rutaEtapaPractica.post('/seleccionarEmpresa',controladorEtapaPractica.seleccionarEmpresa)

rutaEtapaPractica.get('/listarEmpresaSeleccionada/:id_productiva',controladorEtapaPractica.listarEmpresaSeleccionada)

rutaEtapaPractica.get('/desvincularEmpresa/:id_productiva',controladorEtapaPractica.desvincularEmpresa)



module.exports = rutaEtapaPractica;