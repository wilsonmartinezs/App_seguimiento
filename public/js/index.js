


function ValidarUsuario(){
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;
    let datos = new URLSearchParams();
        datos.append('login', login);
        datos.append('password', password);
 
        fetch('/login', {
            method: 'POST',
            body: datos
        })
            .then(data => { return data.json() })
            .then(res => {
          
            if (res.status == 'error') return alert('Usuario o contraseña incorrecta');
             
                localStorage.setItem('token', res.token)
                window.location.href = "/abrirHome";
            })
            .catch(err => {
                console.log(err);
            })
}

