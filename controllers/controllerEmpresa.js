
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
 
 module.exports = controlador;