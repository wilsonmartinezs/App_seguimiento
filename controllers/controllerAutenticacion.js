const conexion= require('../database/conexion_pool');


const jwt = require('jsonwebtoken');


const controlador = {}


controlador.Validar_Usuario = async(req, res) => {
    req.session.user = '';
    req.session.token = '';
    /* ============CONSULTA QUE TRAE EL LOGIN DEL USUARIO QUE PASA COMO PARAMETRO============ */
    var sql =`
           SELECT p.id_persona,p.identificacion, p.nombres,p.rol,p.password
            FROM personas p
            WHERE p.identificacion ='${req.body.login}' AND p.password='${req.body.password}' 
            `; 
        
    try{
        let [rows] =  await conexion.query(sql);
        /* ====FILAS DE LA CONSULTA */
        if(rows.length <= 0) return res.json({status: 'error', message: 'Usuario no autorizado'});
       
       /* ====VALIDA LA CONTRASEÑA===== */      
        let json = {
            id_persona: rows[0].id_persona,
            identificacion:rows[0].identificacion,
            rol:rows[0].rol,
            nombre: rows[0].nombres
        }
       // console.log(json);
        let token = jwt.sign({user: json},process.env.AUTH_SECRET, {expiresIn: process.env.AUTH_EXPIRES});
        let decoded = jwt.verify(token,process.env.AUTH_SECRET);
        req.session.token = token;
        req.session.user = decoded.user;
        return res.json({user:decoded.user, token});
    } catch (e) {
        console.log(e); 
    } 
}



controlador.Validar_Token =async(req, res, next)=> {  
    let token = req.headers.authorization.split(' ')[1];
    if (token=='null') return res.status(401).json({ status:401, message: "El token es reuerido" })
    jwt.verify(token,process.env.AUTH_SECRET, async (err, decoded) => {
         if (err) return res.status(401).
         json({ status: 401, message: 'usuario no autorizado' });
             next();
     });
    
     }
 


controlador.Cerrar_Sesion = (req, res) => {
        req.session.destroy();
        res.json({salida:true});
    }
    


module.exports = controlador;