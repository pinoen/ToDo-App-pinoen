window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    let form = document.querySelector('form');
    let url = 'https://ctd-fe2-todo-v2.herokuapp.com/v1/users/login';
    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        mostrarSpinner();
        let email = document.querySelector('#inputEmail').value;
        let password = document.querySelector('#inputPassword').value;

        if (email !== '' || password !== '') {
            realizarLogin(email, password);
        } else {
            form.innerHTML += `<small class='error'>${"Completar los campos con sus datos de usuario!"}</small>`;
            ocultarSpinner();
        }
        form.reset();
    });
    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(mail, pw) {
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: mail,
                password: pw
            })
        }).then(res => {
            if (res.ok !== true) {
                alert("Alguno de los datos es incorrecto.");
            }
            return res.json();
        }).then(data => {
            localStorage.setItem('token', data.jwt);
            ocultarSpinner();
            location.replace('./mis-tareas.html');
        }).catch(err => {
            Swal.fire('Promesa rechazada!');
            ocultarSpinner();
        })
    };
});