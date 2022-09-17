/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {

}

function normalizarTexto(texto) {

}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
  return /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/.test(email);
}

function normalizarEmail(email) {

}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
  return /(?=.*\W)(?=.*[\w]).{10,15}/.test(contrasenia);
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
  return contrasenia_1 === contrasenia_2;
}

