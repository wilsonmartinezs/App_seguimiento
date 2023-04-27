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





listarTodosAprendices();


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





function legalizarEtapaPractica(idMatricula){
 
  nuevaEtapaPractica(idMatricula);
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
        //  listarTodosAprendices();

          Frm_NuevoAprendiz.hide();
          Mensaje.fire({
            icon: data.icon,
            title: data.text
        })
           
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
          accionBTN =` <a class="btn btn-primary" href="javascript:legalizarEtapaPractica(${element.id_matricula})" title='Asignar'>
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



