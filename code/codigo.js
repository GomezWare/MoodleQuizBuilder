"use strict";
//FUNCTION
function addPregunta() {
  let nombre = String(document.querySelector("#nombre").value).trim;
  let rCorrecta = String(document.querySelector("#rCorrecta").value).trim;
  let rIncorrecta1 = String(document.querySelector("#rIncorrecta1").value).trim;
  let rIncorrecta2 = String(document.querySelector("#rIncorrecta2").value).trim;
  let rIncorrecta3 = String(document.querySelector("#rIncorrecta3").value).trim;

  let divErrores = document.querySelector("#divErrores");
  let divPreguntas = document.querySelector("#divPreguntas");
  if (
    nombre.length == 0 ||
    rCorrecta.length == 0 ||
    rIncorrecta1.length == 0 ||
    rIncorrecta2.length == 0 ||
    rIncorrecta3 == 0
  ) {
    divErrores.innerHTML='<h1 id="error">Rellene todos los campos</h1>';
  } else {
    divPreguntas.innerHTML='<h1>Esta bien</h1>';
  }
}

//MAIN
let btnPregunta = document.querySelector('#addPregunta');
btnPregunta.addEventListener('click', addPregunta);
