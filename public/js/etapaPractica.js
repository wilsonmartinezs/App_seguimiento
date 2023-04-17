

const Mensaje = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

 

  var Frm_EtapaPractica = new bootstrap.Modal(document.getElementById('Frm_EtapaPractica'), {
    keyboard: false
});


var Frm_NuevoAprendiz = new bootstrap.Modal(document.getElementById('Frm_NuevoAprendiz'), {
  keyboard: false
});




listarTodosAprendices();


function AsignarSeguimiento(idMatricula){
  listarMunicipios();
  buscarAprendizMatricula(idMatricula);
  Frm_EtapaPractica.show();
}

function buscarAprendizMatricula(idMatricula){
fetch(`/buscarAprendizMatricula/${idMatricula}`, {
    method: 'get'
}).then(res => res.json())
.then(data => { 
   document.getElementById('identificacion').value=data[0].identificacion;
   document.getElementById('nombres').value=data[0].nombres;
   document.getElementById('telefono').value=data[0].telefono;
   document.getElementById('correo').value=data[0].correo;
   document.getElementById('municipio').value=data[0].municipio;
});  

}


function nuevoAprendiz(){
  listarMunicipios();
  Frm_NuevoAprendiz.show();
}



function registrarAprendiz(){
  let mpio = document.getElementById('municipios').value
  alert(mpio);

let datos= new URLSearchParams();
    datos.append('identificacion',document.getElementById('identificacion').value);
    datos.append('nombres',document.getElementById('nombres').value);
    datos.append('telefono',document.getElementById('telefono').value);
    datos.append('correo',document.getElementById('correo').value);
    datos.append('municipio',1);
  
    fetch(`/registrarAprendiz`, {
                method: 'post',
                body: datos,   
            }).then(res => res.json())
            .then(data => {
            listarTodosAprendices();
            
            Mensaje.fire({
                icon: data.icon,
                title: data.text
            })

            });   



}




function actualizarAprendiz(){
  let mpio = document.getElementById('municipios').value
  alert(mpio);

let datos= new URLSearchParams();
    datos.append('identificacion',document.getElementById('identificacion').value);
    datos.append('nombres',document.getElementById('nombres').value);
    datos.append('telefono',document.getElementById('telefono').value);
    datos.append('correo',document.getElementById('correo').value);
    datos.append('municipio',1);
  
    fetch(`/actualizarAprendiz`, {
                method: 'post',
                body: datos,   
            }).then(res => res.json())
            .then(data => {
            listarTodosAprendices();
            
            Mensaje.fire({
                icon: data.icon,
                title: data.text
            })

            });   



}




function listarMunicipios(){
  fetch(`/listarMunicipios`, {
      method: 'get'
  }).then(res => res.json())
  .then(data => {
     
    let html=`<option value='0' selected disabled>Seleccionar un municipio</option>`;
    data.forEach(element => { 
      html+=`<option value='${element.periodo}'>${element.nombre_mpio} - ${element.departamento} </option>`;           
    });
    document.getElementById('municipios').innerHTML = html;  
    
     
  });  
  
  }






  function listarTodosAprendices() {

    fetch(`/listarTodosAprendices`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
      
      let arrayDatos = [];
      let accionBTN='';
      data.forEach(element => {   
          accionBTN =` <a class="btn btn-primary" href="javascript:AsignarSeguimiento(${element.id_matricula})" title='Asignar'>
                        <i class="fa-solid fa-pen-to-square"></i> </a>
                   `;
          
          let dato = {
             identificacion:element.identificacion,
             nombres:element.nombres,
             ficha:element.codigo,
             programa:element.sigla,
             estado:element.estado,
             Accion : accionBTN

          }
          arrayDatos.push(dato);
      });

      $('#tablaInstructores').DataTable({
          lengthChange: false,
          autoWidth: false,
          destroy: true,
          responsive: true,
          data: arrayDatos,
          columns: [
              {"data": "identificacion"},
              {"data": "nombres"},
              {"data": "ficha"},
              {"data": "programa"},
              {"data": "estado"},
              {"data": "Accion"}     
          ]
      });


    });
}


// listar todos los aprendices
/*
function listarFichasActivas(){
  
  fetch(`/listarFichasActivas`, {
      method:'get'    
  }).then(res => res.json())
  .then(data => {
      let html=`<option value='0'>Seleccione una opción</<option>`;
      data.forEach(element => { 
          html+=`<option value='${element.codigo}'>${element.codigo} - ${element.nombre_programa}</<option>`;         
      });
      document.getElementById('Lista_Fichas').innerHTML = html;  
  });


}

*/
