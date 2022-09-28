// SEGURIDAD: Si no se encuentra en localStorage info del usuario no lo deja acceder a la página, redirigiendo al login inmediatamente.
/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {
  /* ---------------- variables globales y llamado a funciones ---------------- */
  let url = 'https://ctd-fe2-todo-v2.herokuapp.com/v1';
  let token = localStorage.getItem('token');
  let closeBtn = document.querySelector('#closeApp');
  let userName = document.querySelector('.user-info p');
  let addTask = document.querySelector('.nueva-tarea');
  let newTask = document.querySelector('#nuevaTarea');
  let pendingTasks = document.querySelector('.tareas-pendientes');
  let closedTasks = document.querySelector('.tareas-terminadas');
  let numberClosedTasks = document.querySelector('#cantidad-finalizadas');
  let contadorClosedTasks = 0;
  obtenerNombreUsuario();
  consultarTareas();
  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */
  closeBtn.addEventListener('click', function () {
    const cerrarSesion = confirm("¿Desea cerrar sesión?");
    if (cerrarSesion) {
      localStorage.clear();
      location.replace('./index.html');
    }
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
        renderizarTareas(item);
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
        description: newTask.value.trim(),
        completed: false
      })
    }).then(res => res.json()).then(data => {
      renderizarTareas(data);
    })
    addTask.reset();
  });
  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(obj) {
    pendingTasks.innerHTML +=
      `<li class='tarea'>
          <button class='change' id='${obj.id}'>
            <i class='fa-regular fa-circle'></i>
          </button>
          <p class='nombre'>${obj.description}</p>
          <p class='timestamp'>${obj.createdAt.slice(0, 10)}</p>  
        </li>`;
    botonesCambioEstado();
  };
  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    let tareasPendientes = document.querySelectorAll('.change');
    tareasPendientes.forEach(tarea => {
      tarea.addEventListener('click', () => {
        contadorClosedTasks++;
        numberClosedTasks.textContent = contadorClosedTasks;

        tarea.parentNode.remove();

        fetch(url + '/tasks/' + tarea.getAttribute('id'), {
          method: 'put',
          headers: {
            'Authorization': token,
          },
          body: {
            "completed": true,
          }
        }).then(res => res.json()).then(data => {
          closedTasks.innerHTML +=
            `<li class='tarea' id='${data.id}'>
              <div class='hecha'>
                <i class='fa-regular fa-circle-check'></i>
              </div>
                <p class='nombre'>${data.description}</p>
              <div class='cambios-estados'>
                <button class='borrar'><i class='fa-regular fa-trash-can'></i></button>
              </div>  
            </li>`;

          let borrar = document.querySelectorAll('.borrar');
          borrar.forEach(tarea => {
            tarea.addEventListener('click', () => {
              botonBorrarTarea(tarea.parentNode.parentNode.id);
              tarea.parentNode.parentNode.remove();
            })
          })
        })
      })
    })
  }
  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea(id) {
    fetch(url + '/tasks/' + id, {
      method: 'delete',
      headers: {
        'Authorization': token,
      },
    })
  };
});