const express= require('express');
const ruta_index= express.Router(); 

const controladorIndex= require('../controllers/controllerIndex');



ruta_index.get('/',controladorIndex.loginUser);
ruta_index.get('/abrirHome',controladorIndex.Abrir_Home);






module.exports = ruta_index;
