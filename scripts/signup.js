window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    let form = document.querySelector('form');
    let url = 'https://ctd-todo-api.herokuapp.com/v1/users';
    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let nombre = document.querySelector('#inputNombre').value;
        let apellido = document.querySelector('#inputApellido').value;
        let email = document.querySelector('#inputEmail').value;
        let password = document.querySelector('#inputPassword').value;
        let user = {
            firstName: nombre,
            lastName: apellido,
            email: email,
            password: password
        }
        realizarRegister(user);
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
        }).then(res => res.json()).then(data => {
            console.log(data);
            localStorage.setItem('token', data.jwt);
            location.replace('./mis-tareas.html');
        })
    };
});