

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

var Frm_NuevoAprendiz = new bootstrap.Modal(document.getElementById('Frm_NuevoAprendiz'), {
    keyboard: false
  });

  listarTodosAprendices();

function registrarMatricula(){

    let datos= new URLSearchParams();
      datos.append('id_persona', document.getElementById('id_persona').value);
      datos.append('ficha',document.getElementById('fichas').value);
      datos.append('estado',document.getElementById('estado').value);
      datos.append('ingles',document.getElementById('ingles').value);
      datos.append('tecnico',document.getElementById('tecnico').value);
      datos.append('transversal',document.getElementById('transversal').value);
  
  
      
     fetch(`/registrarMatricula`, {
                 method: 'post',
                 body: datos,
             }).then(res => res.json())
             .then(data => {
              listarTodosAprendices();
              Frm_NuevoAprendiz.hide();
              Mensaje.fire({
                icon: data.icon,
                title: data.text
            })
               
             });   
   
   
   }


   function nuevoAprendiz(){
    listarMunicipios();
    listarFichasActivas();
    Frm_NuevoAprendiz.show();
  }
  

  function listarFichasActivas(){
    fetch(`/listarFichasActivas`, {
      method: 'get'
  }).then(res => res.json())
  .then(data => {
     
    let html=`<option value='0' selected disabled>Seleccione una Ficha</option>`;
    data.forEach(element => { 
      html+=`<option value='${element.codigo}'>${element.codigo} - ${element.nombre_programa} </option>`;           
    });
    document.getElementById('fichas').innerHTML = html;   
  });  
  
  }

  
  function buscarAprendiz(){
    let identificacion= document.getElementById('identificacion').value;
   
     fetch(`/buscarAprendiz/${identificacion}`, {
                 method: 'get' 
             }).then(res => res.json())
             .then(data => {
         
               if(data.length >0) {
               document.getElementById('identificacion').value=data[0].identificacion;
               document.getElementById('nombres').value=data[0].nombres;
               document.getElementById('telefono').value=data[0].telefono;
               document.getElementById('correo').value=data[0].correo;
               document.getElementById('municipios').value=data[0].municipio;
               document.getElementById('id_persona').value=data[0].id_persona;
               document.getElementById('fichas').value=data[0].ficha;
               
               document.getElementById('transversal').value=data[0].pendiente_transversales;
               document.getElementById('tecnico').value=data[0].pendiente_tecnicos;
               document.getElementById('ingles').value=data[0].pendiente_ingles;
               document.getElementById('estado').value=data[0].estado;
               
               }else{
                 limpiarFormularioAprendiz();
               }
               
             });   
   
   
   }

   
function limpiarFormularioAprendiz(){

    document.getElementById('identificacion').value='';
    document.getElementById('nombres').value='';
    document.getElementById('telefono').value='';
    document.getElementById('correo').value='';
    document.getElementById('municipios').value='';
    document.getElementById('id_persona').value='';

}


function registrarAprendiz(){
    let datos= new URLSearchParams();
    datos.append('identificacion',document.getElementById('identificacion').value);
    datos.append('nombres',document.getElementById('nombres').value);
    datos.append('telefono',document.getElementById('telefono').value);
    datos.append('correo',document.getElementById('correo').value);
    datos.append('municipio',document.getElementById('municipios').value);
  
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
        html+=`<option value='${element.id_municipio}'>${element.nombre_mpio} - ${element.departamento} </option>`;           
      });
      document.getElementById('municipios').innerHTML = html;  
      
       
    });  
    
    }

    

function actualizarMatricula(identificacion){
 document.getElementById('identificacion').value=identificacion;
 nuevoAprendiz();
 buscarAprendiz();
 

    }

    function listarTodosAprendices() {

        fetch(`/listarTodosAprendices`, {
            method:'get'    
        }).then(res => res.json())
        .then(data => {
          
          let arrayDatos = [];
          let accionBTN='';
          data.forEach(element => {   
              accionBTN =` <a class="btn btn-primary" href="javascript:actualizarMatricula(${element.identificacion})" title='Asignar'>
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