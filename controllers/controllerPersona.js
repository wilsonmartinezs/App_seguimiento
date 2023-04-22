
const conexion= require('../database/conexion_pool');
const controlador={}



controlador.registrarAprendiz = async(req, res) => {
    try {
        let {identificacion,nombres,correo,telefono,municipio}= req.body;
        console.log(req.body);
        // se consulta la existencia del aprendiz
        let sql_existencia=`SELECT count(*) as cantidad FROM personas  per  WHERE identificacion=${identificacion}`;

        const [existencia_estudiante] = await conexion.query(sql_existencia);
        let mensaje='';
        if(existencia_estudiante[0].cantidad>0){
            let sql=`update personas set identificacion=${identificacion},nombres='${nombres}',correo='${correo}',telefono='${telefono}',municipio=${municipio}  where identificacion=${identificacion}`; 
            const operacion = await conexion.query(sql);
            mensaje='Se actualizó con éxtito los datos del aprendiz';
        }
        else{
            let sql=`insert into  personas (identificacion,nombres,correo,telefono,municipio) values (${identificacion},'${nombres}','${correo}','${telefono}',${municipio})`; 
            console.log(sql);
            const operacion = await conexion.query(sql);
            mensaje='Se registraron con éxito los datos basicos del aprendiz';
        }
        return res.status(200).json({
                        titulo: "Datos básicos del aprendiz",
                        icon: "success",
                        text: mensaje
                    }); 
    }catch(e){
           console.log(e);
        }
}















module.exports = controlador;