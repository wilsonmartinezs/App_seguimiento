
const conexion = require('../database/conexion_pool');

const controlador={}







// Se litan todos los aprendices de las fichas y su estado en la etapa practica 

controlador.listarTodosAprendices =async (req, res) => { 
    try{
    let sql=  `
                SELECT ma.id_matricula,pe.id_persona,pe.identificacion,pe.nombres,pe.telefono,pe.correo,fi.codigo,pro.sigla,ma.estado
                FROM matriculas ma
                JOIN personas pe ON pe.id_persona = ma.aprendiz
                JOIN fichas fi ON fi.codigo =  ma.ficha
                JOIN programas pro ON pro.id_programa = fi.programa
                WHERE pe.cargo = 'Aprendiz'
            `;
    const [rows] = await conexion.query(sql);
        res.json(rows);
    }catch (e) {
        console.log(e); 
    } 
} 



controlador.buscarAprendizMatricula = async (req, res) => {  
    try{
        let idMatricula =  req.params.idMatricula; 
        let sql= `
        SELECT per.identificacion,per.nombres,per.correo,per.telefono,per.municipio
        FROM personas  per
        JOIN matriculas ma ON ma.aprendiz = per.id_persona
        WHERE ma.id_matricula= ${idMatricula};
                `;
        const [rows] = await conexion.query(sql);
        res.json(rows);
    }catch(e){
        console.log(e);
    }
 }





 controlador.listarMunicipios = async (req, res) => {  
    try{
   
        let sql= `
        SELECT id_municipio,nombre_mpio,departamento from municipios order by departamento,nombre_mpio;
                `;
        const [rows] = await conexion.query(sql);
        res.json(rows);
    }catch(e){
        console.log(e);
    }
 }


module.exports=controlador;