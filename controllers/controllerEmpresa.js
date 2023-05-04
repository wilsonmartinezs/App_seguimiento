
const conexion= require('../database/conexion_pool');
const controlador={}

controlador.listarEmpresasActivas = async (req, res) => {
    try{
        let sql= `
                SELECT emp.id_empresa,emp.razon_social,emp.direccion,emp.telefono,emp.correo,mu.nombre_mpio 
                FROM empresa emp
                JOIN municipios mu ON mu.id_municipio = emp.municipio
                WHERE emp.estado='Activo'
           `;
         
        const [rows] = await conexion.query(sql);
        res.json(rows);
    }catch(e){
       console.log(e);
    }
 }
 

 
 controlador.registrarEmpresa =async (req, res) => { 
   try{

       let {razon_social,telefono,correo,direccion,municipios}= req.body;
       let sql_insert=`insert into  empresa (razon_social,direccion,telefono,correo,municipio,estado) 
        values ('${razon_social}','${telefono}','${correo}','${direccion}',${municipios},'Activo')`; 
      //  console.log(sql_insert);
       const operacion = await conexion.query(sql_insert);  
  
       return res.status(200).json({
           titulo: "Empresas",
           icon: "success",
           text: 'La empresa se registro con éxito'
       });
   

   }catch (e) {
       console.log(e); 
   } 
} 



controlador.desactivarEmpresa =async (req, res) => { 
   try{

       let id_empresa= req.params.id_empresa;
       let sql_insert=`update empresa estado set estado='Inactivo' where id_empresa=${id_empresa}`; 
      //  console.log(sql_insert);
       const operacion = await conexion.query(sql_insert);  
  
       return res.status(200).json({
           titulo: "Empresas",
           icon: "success",
           text: 'Empresa desactivada con éxito'
       });
   

   }catch (e) {
       console.log(e); 
   } 
} 



 module.exports = controlador;