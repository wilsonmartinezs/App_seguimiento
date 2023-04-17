
const conexion = require('../database/conexion_pool');

const controlador={}
controlador.desplegarEtapaPractica = (req, res) => {
    let  user= req.session.user;
   if(user){
        res.render('etapaPractica.ejs',{user});
   }else{
    res.redirect('/');
   }   
}



module.exports=controlador;