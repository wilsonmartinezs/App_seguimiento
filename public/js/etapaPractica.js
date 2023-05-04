moment.defineLocale('es', {
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
  weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
  weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
  weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
  });

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


var frmDocumentos = new bootstrap.Modal(document.getElementById('frmDocumentos'), {
  keyboard: false
});

var frmInstructor = new bootstrap.Modal(document.getElementById('frmInstructor'), {
  keyboard: false
});


var frmEmpresa = new bootstrap.Modal(document.getElementById('frmEmpresa'), {
  keyboard: false
});




listarAprendicesEtapaPractica();


function asignarInstructor(){
  

let datos= new URLSearchParams();
    datos.append('instructor',document.getElementById('instructores').value);
    datos.append('fecha_inicio',document.getElementById('fecha_i').value);
    datos.append('fecha_fin',document.getElementById('fecha_f').value);
    datos.append('idPractica',document.getElementById('idPractica').value);
    

    fetch(`/asignarInstructor`, {
                method: 'post',
                body: datos,   
            }).then(res => res.json())
            .then(data => {
              listarAprendicesEtapaPractica();
            listarInstructoresSeguimiento();
            frmInstructor.hide();
            Mensaje.fire({
                icon: data.icon,
                title: data.text
            })

            });   




}



function nuevaEmpresa(){
frmEmpresa.show();
}




function desactivarAsignacion(id_asignacion){

    fetch(`/desactivarAsignacion/${id_asignacion}`, {
                method: 'get',
                
            }).then(res => res.json())
            .then(data => {
              listarInstructoresSeguimiento();
            Mensaje.fire({
                icon: data.icon,
                title: data.text
            })

            });   


}

function nuevoInstructor(){

  frmInstructor.show();
}

function listarInstructoresSeguimiento() {
  fetch(`/listarInstructoresSeguimiento`, {
    method:'get'    
}).then(res => res.json())
.then(data => {
  
  
      let arrayDatos = [];
      let accionBTN='';
      data.forEach(element => {   
          accionBTN =element.estado=='Activo' ? `<a class='btn btn-primary' href='javaScript:desactivarAsignacion(${element.id_asignacion})'>Desactivar</a>` :'';;

     


         
          let dato = {
            nombres:element.nombres,
            inicio:moment(element.fecha_inicio).format('DD-MM-YYYY'),
            fin:moment(element.fecha_fin).format('DD-MM-YYYY'),
            estado:element.estado,
            Accion : accionBTN
          }
          arrayDatos.push(dato);
      });

      $('#tablaHistorial').DataTable({
          lengthChange: false,
          autoWidth: false,
          destroy: true,
          responsive: true,
          data: arrayDatos,
          columns: [
              {"data": "nombres"},
              {"data": "inicio"},
              {"data": "fin"},
              {"data": "estado"},
              {"data": "Accion"}
          ]
      });
    });




  
}






function listarInstructoresVinculados() {
  fetch(`/listarInstructoresVinculados`, {
    method:'get'    
}).then(res => res.json())
.then(data => {
  
   let html=`<option value='0' selected disabled>Seleccione una opción</option>`;
    data.forEach(element => {
    html+=`<option value='${element.id_vinculacion}'> ${element.nombres}</option>`;
    });   
    document.getElementById('instructores').innerHTML = html;  
});

  
}





function legalizarEtapaPractica(idMatricula,Inicio){
 

if(Inicio=='Si'){
  nuevaEtapaPractica(idMatricula);
}else{
  Swal.fire({
    title: '¿Desea legalizar la Etapa Practica?',
    showDenyButton: true,
    confirmButtonText: 'Si',
    denyButtonText: `No`,
  }).then((result) => {
    if (result.isConfirmed) {
      nuevaEtapaPractica(idMatricula);
    } else if (result.isDenied) {
      Swal.fire('Operación cancelada..!', '', 'info')
    }
  })


}











}



function subirAcuerdoVoluntades(){
  document.getElementById("titulo_archivo").innerHTML='Subir Acuerdo Voluntades'
document.getElementById('tipo_documento').value='Acuerdo';
frmDocumentos.show();

}


function subirArl(){
  document.getElementById("titulo_archivo").innerHTML='Subir Afiliacion Arl';
document.getElementById('tipo_documento').value='Arl';
frmDocumentos.show();

}

function subirConsulta(){
  document.getElementById("titulo_archivo").innerHTML='Subir Consulta Etapa Practica';
document.getElementById('tipo_documento').value='Consulta';
frmDocumentos.show();

}


function descargarDocumento(documento){

  var url="/soportes/" + documento;
  window.open(url, 'Download');

}

function nuevaEtapaPractica(idMatricula){
  fetch(`/nuevaEtapaPractica/${idMatricula}`, {
              method: 'get'
          }).then(res => res.json())
          .then(data => {
           document.getElementById('idPractica').value=data.datos[0].id_productiva;
           document.getElementById('estado_productiva').value=data.datos[0].estado;
           document.getElementById('alternativa').value=data.datos[0].alternativa;
           let fechaInicio = moment(data.datos[0].fecha_inicio).format('YYYY-MM-DD');
           document.getElementById('fecha_inicio').value=fechaInicio;
           let fechaFin = moment(data.datos[0].fecha_fin).format('YYYY-MM-DD');
           document.getElementById('fecha_fin').value=fechaFin;
           document.getElementById('link_acuerdo').innerHTML=  data.datos[0].acuerdo =='' ? 'No' :`<a href=javascript:descargarDocumento('${data.datos[0].acuerdo}')>Descargar</a>` ;
           document.getElementById('link_arl').innerHTML= data.datos[0].arl =='' ? 'No' :`<a href=javascript:descargarDocumento('${data.datos[0].arl}')>Descargar</a>` ;
           document.getElementById('link_consulta').innerHTML=data.datos[0].acuerdo =='' ? 'No' :`<a href=javascript:descargarDocumento('${data.datos[0].consulta}')>Descargar</a>` ;
           listarMunicipios();
           listarInstructoresVinculados();
           listarInstructoresSeguimiento();
           listarEmpresasActivas();
           listarEmpresaSeleccionada();
         
           Frm_EtapaPractica.show();
           Mensaje.fire({
             icon: data.icon,
             title: data.text
         })
            
          });   
 
 }
 

function cargarArchivo(){
  let datos= new FormData();
  datos.append('idPractica',   document.getElementById('idPractica').value);
  datos.append('tipo_documento',document.getElementById('tipo_documento').value);
  let FileN = document.getElementById('archivo');
  datos.append('img', FileN.files[0]);
  fetch('/cargarArchivo',
            {
                method: 'POST',
                body:datos
            })
        .then(resp =>resp.json())
        .then(data=>{
          frmDocumentos.hide();
            Mensaje.fire({
            icon: 'success',
            title: data.text
            });

        });
        

}


function actualizarEtapaPractica(){


 let datos= new URLSearchParams();
  datos.append('idPractica',   document.getElementById('idPractica').value);
  datos.append('estado',document.getElementById('estado_productiva').value);
  datos.append('alternativa',document.getElementById('alternativa').value);
  datos.append('fecha_inicio',document.getElementById('fecha_inicio').value);
  datos.append('fecha_fin',document.getElementById('fecha_fin').value);
 

 fetch(`/actualizarEtapaPractica`, {
             method: 'post',
             body: datos,
         }).then(res => res.json())
         .then(data => {
            Mensaje.fire({
            icon: data.icon,
            title: data.text
        })
           
         });   


}



function listarAprendicesEtapaPractica() {

    fetch(`/listarAprendicesEtapaPractica`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
      
      let arrayDatos = [];
      let accionBTN='';
      data.forEach(element => {   
          accionBTN =element.alternativa==null ? ` <a class="btn btn-danger" href="javascript:legalizarEtapaPractica(${element.id_matricula},'No')" title='Administrar'>
                        <i class="fa-solid fa-pen-to-square"></i> </a> ` 
                        
                        :
                        
                        ` <a class="btn btn-primary" href="javascript:legalizarEtapaPractica(${element.id_matricula},'Si')" title='Administrar'>
                        <i class="fa-solid fa-pen-to-square"></i> </a> `
                        ;

                  
          
          let dato = {
             identificacion:element.identificacion,
             nombres:element.nombres,
             ficha:`${element.codigo} - ${element.sigla} ` ,
             alternativa:element.alternativa,
             fechas:element.fechas,
             empresa:element.empresa,
             instructor:element.instructor,
             meses:element.meses,
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
              {"data": "alternativa"},
              {"data": "fechas"},
              {"data": "empresa"},
              {"data": "instructor"},
              {"data": "meses"},
              {"data": "Accion"}     
          ]
      });


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


function seleccionarEmpresa(id_empresa){
let datos= new URLSearchParams();
datos.append('idPractica',   document.getElementById('idPractica').value);
datos.append('id_empresa', id_empresa);
  
 fetch(`/seleccionarEmpresa`, {
             method: 'post',
             body: datos,
         }).then(res => res.json())
         .then(data => {
          listarEmpresaSeleccionada();
            Mensaje.fire({
            icon: data.icon,
            title: data.text
        })
           
         });   


}


function listarEmpresaSeleccionada(){

 let idPractica =  document.getElementById('idPractica').value;
    
   fetch(`/listarEmpresaSeleccionada/${idPractica}`, {
               method: 'get'
           }).then(res => res.json())
           .then(data => {
             console.log(data);


             let html=``;
             data.forEach(element => {
        
               let boton= '';
               
               boton=  `<a href='javaScript:desvincularEmpresa(${element.id_productiva})'>Eliminar</a>`;
   
           
               html+=`<tr>
                   <td>${element.razon_social}</td>
                   <td>${element.nombre_mpio}</td>
                   <td>${element.direccion}</td>
                   <td>${element.telefono}</td>
                   <td>${element.correo}</td>
                   <td>${boton}</td>
                   </tr> 
                   `;
             });   
              html +=``;
             document.getElementById('tablaEmpresaSeleccionada').innerHTML = html; 


             
           });   
  
  
  }
  
function desvincularEmpresa(id_productiva){
 
 fetch(`/desvincularEmpresa/${id_productiva}`, {
             method: 'get',
         }).then(res => res.json())
         .then(data => {
          listarEmpresaSeleccionada();
            Mensaje.fire({
            icon: data.icon,
            title: data.text
        })
           
         });   





}

function listarEmpresasActivas() {

    fetch(`/listarEmpresasActivas`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
      
      let arrayDatos = [];
      let accionBTN='';
      data.forEach(element => {   
          accionBTN =` <a class="btn btn-success" href="javascript:seleccionarEmpresa(${element.id_empresa})" title='Seleccionar'>
                        Selec.</a>
                        <a class="btn btn-danger" href="javascript:desactivarEmpresa(${element.id_empresa})" title='Eliminar'>
                        Elim.</a>
                   `;
          //emp.id_empresa,emp.razon_social,emp.direccion,emp.telefono,emp.correo,mu.nombre_mpio
          let dato = {
            razon_social:element.razon_social,
            direccion:element.direccion,
            telefono:element.telefono,
            correo:element.correo,
            nombre_mpio:element.nombre_mpio,
            Accion : accionBTN
          }
          arrayDatos.push(dato);
      });

      $('#tablaEmpresas').DataTable({
          lengthChange: false,
          autoWidth: false,
          destroy: true,
          responsive: true,
          data: arrayDatos,
          columns: [
              {"data": "razon_social"},
              {"data": "direccion"},
              {"data": "telefono"},
              {"data": "correo"},
              {"data": "nombre_mpio"},
              {"data": "Accion"}     
          ]
      });
    });


}



function registrarEmpresa(){

  
 let datos= new URLSearchParams();
 datos.append('razon_social',   document.getElementById('razon_social').value);
 datos.append('telefono',document.getElementById('telefono').value);
 datos.append('correo',document.getElementById('correo').value);
 datos.append('direccion',document.getElementById('direccion').value);
 datos.append('municipios',document.getElementById('municipios').value);

fetch(`/registrarEmpresa`, {
            method: 'post',
            body: datos,
        }).then(res => res.json())
        .then(data => {
          listarEmpresasActivas();
           Mensaje.fire({
           icon: data.icon,
           title: data.text
       })
          
        });   


}

function desactivarEmpresa(id_empresa){


  Swal.fire({
    title: '¿Desea eliminar la empresa?',
    showDenyButton: true,
    confirmButtonText: 'Si',
    denyButtonText: `No`,
  }).then((result) => {
    if (result.isConfirmed) {
       
      fetch(`/desactivarEmpresa/${id_empresa}`, {
            method: 'get'
        }).then(res => res.json())
        .then(data => {
              listarEmpresasActivas();
              Mensaje.fire({
              icon: data.icon,
              title: data.text
            })
        });   


    } else if (result.isDenied) {
      Swal.fire('Operación cancelada..!', '', 'info')
    }
  })






}