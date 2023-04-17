
const conexion = require('../database/conexion_pool');

const controlador={}


controlador.Abrir_Index = (req, res) => {
    res.render('index.ejs');
}
/* Prueba */
controlador.loginUser = (req, res) => {
    res.render('index.ejs');

}

controlador.Abrir_Home = (req, res) => {

    let  user= req.session.user;
   

   if(user){
        res.render('home.ejs',{user});
   }else{
    res.redirect('/');
   }

    
}





module.exports=controlador;