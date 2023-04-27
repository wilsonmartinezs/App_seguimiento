
const conexion = require('../database/conexion_pool');
const multer= require('multer-js');
const path = require('path');
const controlador={}


const storage = multer.diskStorage({
     destination: function(req, img, cb) {
         try{
             cb(null, "public/soportes");
         }catch(e){
             console.log(e);
         }
     },
     filename: function(req, img, cb) {
     try{

        const extname = path.extname(img.originalname);
        if (extname !== '.pdf') {
          return cb(new Error('Solo se permiten archivos PDF'))
        }else{
            req.fileNewName = img.originalname.replace(/\s/g, '');
            cb(null, req.fileNewName);
        }

      

     }catch(e){
         console.log(e);
     }
 
     },
 });

 const fileFilter = (req, img, cb) => {
    const extname = path.extname(img.originalname);
    if (extname !== '.pdf') {
      return cb('Solo se permiten archivos PDF')
    }
    cb(null, true)
  }

 const upload = multer({ storage, fileFilter });
 controlador.cargarDocumento = upload.single("img");
 



controlador.desplegarEtapaPractica = (req, res) => {
    let  user= req.session.user;
   if(user){
        res.render('etapaPractica.ejs',{user});
   }else{
    res.redirect('/');
   }   
}





controlador.cargarArchivo =async (req, res) => { 
    try{

        let {idPractica,tipo_documento}= req.body;
        let img= req.fileNewName;

        if (!img) img = 'NULL';

        let actualizar_documento='';

        if (tipo_documento=='Acuerdo'){
            actualizar_documento=`acuerdo='${img}'`
        }
        if (tipo_documento=='Arl'){
            actualizar_documento=`arl='${img}'`
        }
        if (tipo_documento=='Consulta'){
            actualizar_documento=`consulta='${img}'`
        }


        let sql_update=`update productiva 
                        set ${actualizar_documento}
                        where id_productiva=${idPractica}`; 
           
        const operacion = await conexion.query(sql_update);     
        return res.status(200).json({
            titulo: "Datos Etapa Practica",
            icon: "success",
            text: 'Documento Caergado con éxito'
        });
       
    }catch (e) {
        console.log(e); 
    } 
} 




controlador.nuevaEtapaPractica =async (req, res) => { 
     try{

         let idMatricula= req.params.idMatricula;
         let sql_existencia= `SELECT id_productiva FROM productiva pro where pro.matricula=${idMatricula} and pro.estado='Inicio' `;
      //  console.log(sql_select);
         const [rows_existencia] = await conexion.query(sql_existencia);
        
         if(rows_existencia.length>0){  
          
          let sql_productiva= `SELECT id_productiva,matricula,empesa,fecha_inicio,fecha_fin,alternativa,estado,acuerdo,arl,consulta FROM productiva pro where id_productiva=${rows_existencia[0].id_productiva}`;
          const [rows_productiva] = await conexion.query(sql_productiva);
            return res.status(200).json({
             datos:rows_productiva,
             titulo: "Datos Etapa Practica",
             icon: "success",
             text: 'Tiene registrada una Etapa Practica en inicio'
         });
 
     }else{
         let sql_insert=`insert into  productiva (matricula,estado) values (${idMatricula},'Inicio')`; 
          console.log(sql_insert);
         const operacion = await conexion.query(sql_insert);  
         
         let sql_productiva= `SELECT id_productiva FROM productiva pro  where pro.matricula=${idMatricula} and pro.estado='Inicio'`;
         const [rows_productiva] = await conexion.query(sql_productiva);


         return res.status(200).json({
             datos:rows_productiva,
             titulo: "Datos Etapa Practica",
             icon: "success",
             text: 'Etapa Practica registrada con éxito'
         });
     }
  
     }catch (e) {
         console.log(e); 
     } 
 } 





controlador.actualizarEtapaPractica =async (req, res) => { 
     try{
 //acuerdo,arl,consulta
         let {idPractica,estado,alternativa,fecha_inicio,fecha_fin}= req.body;
        
        // console.log(sql_select);

             let sql_update=`update productiva 
                             set fecha_inicio='${fecha_inicio}',fecha_fin='${fecha_fin}',alternativa='${alternativa}',estado='${estado}'
                             where id_productiva=${idPractica}`; 
            
         const operacion = await conexion.query(sql_update);     
         return res.status(200).json({
             titulo: "Datos Etapa Practica",
             icon: "success",
             text: 'Etapa Practica actulizada con éxito'
         });
 
    
         
        
     }catch (e) {
         console.log(e); 
     } 
 } 
 
 





module.exports=controlador;