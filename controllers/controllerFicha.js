
const conexion= require('../database/conexion_pool');
const Controlador={}



Controlador.listarFichasActivas = async (req, res) => {
   
    try{
        let sql= `
                    SELECT fi.codigo,fi.inicio_ficha,fi.fin_lectiva,fi.fin_ficha,pro.nombre_programa FROM fichas fi
                    JOIN programas pro ON pro.id_programa = fi.programa
                    WHERE fi.estado='Activa' order by pro.nombre_programa;
      `;

         
        const [rows] = await conexion.query(sql);
        res.json(rows);
    }catch(e){
       console.log(e);
    }
 }
 






 








module.exports = Controlador;