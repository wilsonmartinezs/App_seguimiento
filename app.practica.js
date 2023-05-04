const express = require('express');
const bodyparser= require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session');



const app = express();

//Configuración del motor de plantilla ejs
app.set('views', './vistas');
app.set('view engine', 'ejs');

// Se configura para recibir parametros de formulario
 app.use(bodyparser.json());
 app.use(bodyparser.urlencoded({extended:false}));

//Configuración de archivos estáticos
app.use(express.static('./public'));

//Se asigna el puerto al servidor 
app.set('port', process.env.PORT || 4000);

dotenv.config({path: './env/.env'});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))

/*Se asignan las rutas al servidor*/
app.use(require('./routes/routeIndex'));

app.use(require('./routes/routeAutenticacion'));

app.use(require('./routes/routePersona'));

app.use(require('./routes/routeEtapaPractica'));
app.use(require('./routes/routeFicha'));
app.use(require('./routes/routeMatricula'));
app.use(require('./routes/routeVinculacion'));
app.use(require('./routes/routeEmpresa'));
app.use(require('./routes/routeSeguimiento'));


app.listen(app.get('port'), function() {
    console.log(`Aplicación corriendo en el puerto ${app.get('port')}`);
});

