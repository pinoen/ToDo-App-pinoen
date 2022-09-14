// SEGURIDAD: Si no se encuentra en localStorage info del usuario no lo deja acceder a la página, redirigiendo al login inmediatamente.
/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {
  /* ---------------- variables globales y llamado a funciones ---------------- */
  let url = 'https://ctd-todo-api.herokuapp.com/v1';
  let token = localStorage.getItem('token');
  let closeBtn = document.querySelector('#closeApp');
  let userName = document.querySelector('.user-info p');
  let addTask = document.querySelector('.nueva-tarea');
  let newTask = document.querySelector('#nuevaTarea');
  let pendingTasks = document.querySelector('.tareas-pendientes');
  let closedTasks = document.querySelector('.tareas-terminadas');
  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */
  closeBtn.addEventListener('click', function () {
    localStorage.clear();
    location.replace('./index.html');
  });
  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */
  function obtenerNombreUsuario() {
    fetch(url + '/users/getMe', {
      method: 'get',
      headers: {
        'Authorization': token,
      }
    }).then(res => res.json()).then(data => {
      userName.textContent = data.firstName + ' ' + data.lastName;
    })
  };
  obtenerNombreUsuario();
  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */
  function consultarTareas() {
    fetch(url + '/tasks', {
      method: 'get',
      headers: {
        'Authorization': token,
      }
    }).then(res => res.json()).then(data => {
      console.log(data);
    })
  };
  consultarTareas();
  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  addTask.addEventListener('submit', function (e) {





  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {







  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {





  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {





  };

});