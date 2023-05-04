
listarEstadoSeguimientos();

function listarEstadoSeguimientos() {

    fetch(`/listarEstadoSeguimientos`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
      
      let arrayDatos = [];
      let accionBTN='';
      data.forEach(element => {   
          accionBTN =` <a class="btn btn-primary" href="javascript:actualizarMatricula(${element.id_productiva})" title='Asignar'>
                        <i class="fa-solid fa-pen-to-square"></i> </a>
                   `;
          
          let dato = {
            identificacion:element.identificacion,
            nombres:element.nombres,
            meses:element.meses,
            seguimiento1:element.seguimiento1,
            seguimiento2:element.seguimiento2,
            seguimiento3:element.seguimiento3,
            instructor:element.instructor,
             Accion : accionBTN

          }
          arrayDatos.push(dato);
      });

      $('#tablaSeguimientos').DataTable({
        
          lengthChange: false,
          autoWidth: false,
          destroy: true,
          responsive: true,
          data: arrayDatos,
          columns: [
              {"data": "identificacion"},
              {"data": "nombres"},
              {"data": "meses"},
              {"data": "seguimiento1"},
              {"data": "seguimiento2"},
              {"data": "seguimiento3"},
              {"data": "instructor"},
              {"data": "Accion"}     
          ],
          rowCallback:function(row,data)
          {
              
              if ( data.meses===4)// cando vence el resultado verde
              {
                  $($(row).find("td")[3]).css('background-color','#FF3333');
              }
             

  
          }
      });


    });
}