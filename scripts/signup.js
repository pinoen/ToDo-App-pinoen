window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    let form = document.querySelector('form');
    let url = 'https://ctd-fe2-todo-v2.herokuapp.com/v1/users';
    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let nombre = document.querySelector('#inputNombre').value;
        let apellido = document.querySelector('#inputApellido').value;
        let email = document.querySelector('#inputEmail').value;
        let password = document.querySelector('#inputPassword').value;
        let reingresoPw = document.querySelector('#inputPasswordRepetida').value;
        let user = {
            firstName: nombre,
            lastName: apellido,
            email: email,
            password: password
        }
        if (validarEmail(email) && validarContrasenia(password) && compararContrasenias(password, reingresoPw)) {
            realizarRegister(user);
        } else {
            form.innerHTML += `<small class='error'>${"Verifique los datos ingresados."}</small>
                <small class='error'>${"Todos los campos deben completarse con datos validos."}</small>
                <small class='error'>${"La contrasena debe tener entre 10 y 15 dígitos alfanuméricos y 1 carácter especial (*,$,&)"}</small>`;
        }
        form.reset();
    });
    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(newUser) {
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then(res => {
            if (res.ok !== true) {
                alert("Alguno de los datos es incorrecto.");
            }
            return res.json();
        }).then(data => {
            localStorage.setItem('token', data.jwt);
            location.replace('./mis-tareas.html');
        }).catch(err => {
            Swal.fire('Promesa rechazada!');
        })
    };
});