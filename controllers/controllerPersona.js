
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
            mensaje='El aprendiz ya se encuentra registrado';    
        }
        else{
            let sql=`insert into  personas (identificacion,nombres,correo,telefono,municipio) values (${identificacion},'${nombres}','${correo}','${telefono}',${municipio})`; 
            console.log(sql);
            const operacion = await conexion.query(sql);
            mensaje='Se registro con éxito el aprendiz';
        }
        return res.status(200).json({
                        titulo: "Registro del aprendiz",
                        icon: "success",
                        text: mensaje
                    }); 



    }catch(e){
           console.log(e);
        }
}




controlador.actualizarAprendiz = async(req, res) => {

    try {
        let {identificacion,nombres,correo,telefono,municipio}= req.body;

        // se consulta la existencia del aprendiz
        let sql_existencia=`SELECT count(*) as cantidad FROM personas  per  WHERE identificacion=${identificacion}`;
       
        
        const [existencia_estudiante] = await conexion.query(sql_existencia);
        let mensaje='';
        if(existencia_estudiante[0].cantidad>0){
            let sql=`update personas set identificacion=${identificacion},nombres='${nombres}',correo='${correo}',telefono='${telefono}',municipio=${municipio}  where identificacion=${identificacion}`; 
            console.log(sql);
            const operacion = await conexion.query(sql);
            mensaje='Se actualizaron los datos del aprendiz';
            
        }
        else{
            mensaje='No se encontraron datos del aprendiz';
        }
        return res.status(200).json({
                        titulo: "Registro del aprendiz",
                        icon: "success",
                        text: mensaje
                    }); 



    }catch(e){
           console.log(e);
        }
}







module.exports = controlador;