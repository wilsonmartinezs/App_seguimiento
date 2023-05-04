
const conexion = require('../database/conexion_pool');

const controlador={}


controlador.matriculaAprendiz = (req, res) => {
    let  user= req.session.user;
   if(user){
        res.render('matricula.ejs',{user});
   }else{
    res.redirect('/');
   }   
}



controlador.registrarMatricula =async (req, res) => { 
    try{

        let {id_persona,ficha,estado,ingles,tecnico,transversal}= req.body;

        let sql_select= `SELECT id_matricula
                         FROM matriculas ma
                         where ma.ficha=${ficha} and ma.aprendiz = ${id_persona} and ma.estado='Formación'`;
        const [rows] = await conexion.query(sql_select);
       // console.log(sql_select);
        if(rows.length>0){
            let sql_insert=`update matriculas 
                            set aprendiz=${id_persona},ficha=${ficha},estado='${estado}',pendiente_tecnicos=${tecnico},pendiente_transversales=${transversal},pendiente_ingles=${ingles}
                            where id_matricula=${rows[0].id_matricula}`; 
           
        const operacion = await conexion.query(sql_insert);     
        return res.status(200).json({
            titulo: "Datos Matricula",
            icon: "success",
            text: 'Se actualizo con exito la matricula'
        });

    }else{
        let sql_insert=`insert into  matriculas (aprendiz,ficha,estado,pendiente_tecnicos,pendiente_transversales,pendiente_ingles) values (${id_persona},${ficha},'${estado}',${tecnico},${transversal},${ingles})`; 
        const operacion = await conexion.query(sql_insert);     
        return res.status(200).json({
            titulo: "Datos Matricula",
            icon: "success",
            text: 'Se registró los datos de la matricula con éxito'
        });

    }
       
        
    }catch (e) {
        console.log(e); 
    } 
} 




controlador.listarAprendicesMatriculados =async (req, res) => { 
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






// Se litan todos los aprendices de las fichas y su estado en la etapa practica 

controlador.listarAprendicesEtapaPractica =async (req, res) => { 
    try{
    let sql=  `
                SELECT ma.id_matricula,pe.id_persona,pe.identificacion,pe.nombres,pe.telefono,pe.correo,fi.codigo,pro.sigla,ma.estado,
                (SELECT alternativa FROM productiva prod WHERE prod.matricula = ma.id_matricula) AS alternativa,
                (SELECT CONCAT(fecha_inicio,' Al ',fecha_fin) FROM productiva prod WHERE prod.matricula = ma.id_matricula) AS fechas,
                (SELECT razon_social FROM productiva prod  JOIN empresa em ON em.id_empresa=prod.empresa
                WHERE prod.matricula = ma.id_matricula) AS empresa,
                 (SELECT p.nombres FROM productiva prod 
                    JOIN asignaciones a ON a.productiva=prod.id_productiva
                    JOIN vinculacion v ON v.id_vinculacion=a.instructor
                    JOIN personas p ON p.id_persona = v.instructor
                    WHERE prod.matricula = ma.id_matricula AND a.estado='Activo') AS instructor,
               (SELECT TIMESTAMPDIFF(MONTH,fecha_inicio ,CURDATE()) FROM productiva prod WHERE prod.matricula = ma.id_matricula) AS meses

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



 controlador.buscarAprendiz = async(req, res) => {
    try {
        let identificacion =req.params.identificacion;
        let sql=` SELECT id_persona,identificacion,nombres,correo,telefono,cargo,municipio,pendiente_tecnicos,pendiente_transversales,pendiente_ingles,ficha,ma.estado
        FROM personas  per
        LEFT JOIN matriculas ma ON ma.aprendiz = per.id_persona
        WHERE per.identificacion = ${identificacion}`;
        const [row] = await conexion.query(sql);      
        return res.status(200).json(row);    
    }catch(e){
           console.log('buscarAprendiz :'+e);
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