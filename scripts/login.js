window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    let form = document.querySelector('form');
    let url = 'https://ctd-todo-api.herokuapp.com/v1/users/login';
    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let email = document.querySelector('#inputEmail').value;
        let password = document.querySelector('#inputPassword').value;
        realizarLogin(email, password);
    });
    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(mail, pw) {
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: mail,
                password: pw
            })
        }).then(res => res.json()).then(data => {
            localStorage.setItem('token', data.jwt);
            location.replace('./mis-tareas.html');
        })
    };
});