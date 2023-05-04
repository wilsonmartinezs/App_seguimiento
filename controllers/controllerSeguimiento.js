
const conexion= require('../database/conexion_pool');
const controlador={}



controlador.seguimientoAprendiz = (req, res) => {
    let  user= req.session.user;
   if(user){
        res.render('seguimiento.ejs',{user});
   }else{
    res.redirect('/');
   }   
}



// Se litan todos los aprendices en etapa practica

controlador.listarAprendicesEtapaPractica =async (req, res) => { 
     try{
     let sql=  `
                 SELECT ma.id_matricula,pe.id_persona,pe.identificacion,pe.nombres,
                               
          
                 FROM matriculas ma
                 JOIN personas pe ON pe.id_persona = ma.aprendiz
                 JOIN fichas fi ON fi.codigo =  ma.ficha
                 JOIN programas pro ON pro.id_programa = fi.programa
                 WHERE pe.cargo = 'Aprendiz' and ma.estado='Formación'
             `;
     const [rows] = await conexion.query(sql);
         res.json(rows);
     }catch (e) {
         console.log(e); 
     } 
 } 
 


 
 controlador.listarEstadoSeguimientos = async (req, res) => {
     try{
         let sql= `  
             SELECT prod.id_productiva,pe.identificacion,pe.nombres,
             (SELECT TIMESTAMPDIFF(MONTH,fecha_inicio ,CURDATE()) FROM productiva prod WHERE prod.matricula = ma.id_matricula) AS meses,
             (SELECT GROUP_CONCAT(CONCAT(bi.bitacora,'(',bi.estado,')')) 
             FROM seguimientos seg 
             JOIN bitacoras bi ON bi.seguimiento=seg.id_seguimiento
             WHERE seg.productiva= prod.id_productiva AND seg.seguimiento='Seguimiento 1'
             ) AS seguimiento1,
 
             (SELECT GROUP_CONCAT(CONCAT(bi.bitacora,'(',bi.estado,')')) 
             FROM seguimientos seg 
             JOIN bitacoras bi ON bi.seguimiento=seg.id_seguimiento
             WHERE seg.productiva= prod.id_productiva AND seg.seguimiento='Seguimiento 2'
             ) AS seguimiento2,
 
             (SELECT GROUP_CONCAT(CONCAT(bi.bitacora,'(',bi.estado,')')) 
             FROM seguimientos seg 
             JOIN bitacoras bi ON bi.seguimiento=seg.id_seguimiento
             WHERE seg.productiva= prod.id_productiva AND seg.seguimiento='Seguimiento 3'
             ) AS seguimiento3,
 
             (SELECT GROUP_CONCAT(CONCAT(bi.bitacora,'(',bi.estado,')')) 
             FROM seguimientos seg 
             JOIN bitacoras bi ON bi.seguimiento=seg.id_seguimiento
             WHERE seg.productiva= prod.id_productiva AND seg.seguimiento='Seguimiento 4'
             ) AS seguimiento4,
             (SELECT p.nombres FROM productiva prod 
               JOIN asignaciones a ON a.productiva=prod.id_productiva
               JOIN vinculacion v ON v.id_vinculacion=a.instructor
               JOIN personas p ON p.id_persona = v.instructor
               WHERE prod.matricula = ma.id_matricula AND a.estado='Activo') AS instructor
                                 
                     
             FROM matriculas ma
             JOIN productiva prod ON prod.matricula = ma.id_matricula
             -- join seguimientos seg on seg.productiva = prod.id_productiva
             JOIN personas pe ON pe.id_persona = ma.aprendiz
 
 
             WHERE pe.cargo = 'Aprendiz' AND ma.estado='Formación' AND prod.estado='Inicio'
             GROUP BY prod.id_productiva
       `;
          
         const [rows] = await conexion.query(sql);
         res.json(rows);
     }catch(e){
        console.log(e);
     }
  }
  




module.exports = controlador;