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
  let numberClosedTasks = document.querySelector('#cantidad-finalizadas');
  let tareas = [];
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
      data.forEach(item => {
        tareas.push(item);
      });
    })
  };

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */
  addTask.addEventListener('submit', function (e) {
    e.preventDefault();
    fetch(url + '/tasks', {
      method: 'post',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: newTask.value,
        completed: false
      })
    }).then(res => res.json()).then(data => {
      renderizarTareas(data);
    })
    newTask.value = '';
  });
  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(obj) {
    pendingTasks.innerHTML += `<li class='tarea'>
                                <button class='change' id='${obj.id}'>
                                  <i class='fa-regular fa-circle'></i>
                                </button>
                                <div class='description'>
                                  <p class='nombre'>${obj.description}</p>
                                  <p class='timestamp'>${obj.createdAt.slice(0, 10)}</p> 
                                </div>  
                              </li>`;
    botonesCambioEstado();
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