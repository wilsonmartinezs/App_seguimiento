const conexion= require('../database/conexion_pool');
const controlador={}


controlador.listarInstructoresVinculados = async (req, res) => {
    try{
        let sql= `
                    SELECT vi.id_vinculacion,per.nombres
                    FROM personas  per 
                    JOIN vinculacion vi ON vi.instructor =per.id_persona
                    WHERE cargo='Instructor'
        `;
    
        const [rows] = await conexion.query(sql);
        res.json(rows);
    }catch(e){
       console.log(e);
    }
 }
 

 



module.exports = controlador;