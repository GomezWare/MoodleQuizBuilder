"use strict";
//FUNCTION
function addPregunta() {

  //TODO aqui habria que escapear los caracteres especiales (regex replace??)

  //Se recuperan los datos y se parsean
  //HACK se deberian hacer clases para poder gestionar mejor el codigo no vendria mal refactorizar
  let nombre = String(document.querySelector("#nombre").value).trim();
  let rCorrecta = String(document.querySelector("#rCorrecta").value).trim();
  let rIncorrecta1 = String(
    document.querySelector("#rIncorrecta1").value
  ).trim();
  let rIncorrecta2 = String(
    document.querySelector("#rIncorrecta2").value
  ).trim();
  let rIncorrecta3 = String(
    document.querySelector("#rIncorrecta3").value
  ).trim();

  let divErrores = document.querySelector("#divErrores");
  let divPreguntas = document.querySelector("#divPreguntas");
  if (
    nombre.length == 0 ||
    rCorrecta.length == 0 ||
    rIncorrecta1.length == 0 ||
    rIncorrecta2.length == 0 ||
    rIncorrecta3.length == 0
  ) {
    divPreguntas.innerHTML = "";
    divErrores.innerHTML = '<h1 id="error">Rellene todos los campos</h1>';
  } else {
    //TODO Crear el objeto prgunta, añadirlo al array y hacer que el propio objeto devuleva el div que inserta este metodo
    divErrores.innerHTML = "";
    divPreguntas.innerHTML = "<h1>Esta bien</h1>";
  }

  //TODO Lo ideal seria una funcion que que imprimera el array de preguntas a modo de bucle for y se pudiera llamar desde todos los metodos que repinten la pantalla.
}

//TODO Funcion generar archivo

//TODO Funcion Borra Preguntas

//FIXME Crear pregunta vs Guardar pregunta???

//TODO Diseñar un metodo para que se pueda descartar la pregunta o recuperarla

//MAIN

// EVENTS LISTENERS
let btnPregunta = document.querySelector("#addPregunta");
btnPregunta.addEventListener("click", addPregunta);
