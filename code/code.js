"use strict";
// GLOBAL
////
var divPreguntas = document.querySelector("#divPreguntas");
var divErrores = document.querySelector("#divErrores");
var contadorIDs = 0;

//////////
//MAIN //
////////
arranque();

//EVENT LISTENERS
/////
let btnGuardarPregunta = document.querySelector("#guardarPregunta");
btnGuardarPregunta.addEventListener("click", guardarPregunta);

let btnSavePreguntas = document.querySelector("#savePreguntas");
btnSavePreguntas.addEventListener("click", savePreguntas);

let btnDelPreguntas = document.querySelector("#delPreguntas");
btnDelPreguntas.addEventListener("click", delPreguntas);

//////////////
//FUNCTION //
////////////

function arranque() {
  if (!localStorage.getItem("Cuestionario") == "") {
  let preguntas = localStorage.getItem("Cuestionario");
  preguntas = JSON.parse(preguntas);
  preguntas.forEach(p => {
    p.toHTMLUL = function (){
      let elementoUL = `<ul>`;
    elementoUL += `<li>${this.texto}</li>`;
    elementoUL += `<li>${this.rC}</li>`;

    this.rI.forEach((inc) => {
      elementoUL += `<li>${inc}</li>`;
    });

    elementoUL += `</ul>`;
    return elementoUL;
    };
  });
  Cuestionario.preguntas=preguntas;
  mostrarPreguntas();
  } else {
    alert("Todavía no hay preguntas creada");
    localStorage.setItem("Cuestionario", "");
    //Se crea el cuestionario en objetos.js
  }
}

function savePreguntas() {
  localStorage.setItem("Cuestionario", JSON.stringify(Cuestionario.preguntas));
};


function delPreguntas() {
  localStorage.setItem("Cuestionario", "");
  Cuestionario.preguntas = [];
  mostrarPreguntas();
}

function guardarPregunta() {
  let texto = String(document.querySelector("#texto").value);

  let rC = String(document.querySelector("#rC").value);

  let rI1 = String(document.querySelector("#rI1").value);

  let rI2 = String(document.querySelector("#rI2").value);

  let rI3 = String(document.querySelector("#rI3").value);

  if (validateInputs(texto, rC, rI1, rI2, rI3)) {
    texto = escapear(texto);
    rC = escapear(rC);
    rI1 = escapear(rI1);
    rI2 = escapear(rI2);
    rI3 = escapear(rI3);

    let rI = [rI1, rI2, rI3];

    let id = contadorIDs;
    contadorIDs++;

    let oPregunta = new Pregunta(id, texto, rC, rI);

    Cuestionario.addPregunta(oPregunta);

    mostrarPreguntas();
  }
}

function recuperarPregunta(id) {
  const index = Cuestionario.preguntas.findIndex((p) => p.id === id);
  let pRecuperada = Cuestionario.getPregunta(index);
  document.querySelector("#texto").value = descapear(pRecuperada.texto);
  document.querySelector("#rC").value = descapear(pRecuperada.rC);
  document.querySelector("#rI1").value = descapear(pRecuperada.rI[0]);
  document.querySelector("#rI2").value = descapear(pRecuperada.rI[1]);
  document.querySelector("#rI3").value = descapear(pRecuperada.rI[2]);
}

//AUXILIAR FUNCTIONS
//////

function mostrarPreguntas() {
  divPreguntas.innerHTML = "";
  Cuestionario.preguntas.forEach((p) => {
    divPreguntas.innerHTML += Cuestionario.preguntaToHTMLDiv(p.id);
  });
}

function validateInputs(texto, rC, rI1, rI2, rI3) {
  // Valida inputs y muestra errores

  if (
    texto.length == 0 ||
    rC.length == 0 ||
    rI1.length == 0 ||
    rI2.length == 0 ||
    rI3.length == 0
  ) {
    divErrores.innerHTML = `<h1>Rellene todos los campos</h1>`;
    return false;
  } else {
    divErrores.innerHTML = "";
    return true;
  }
}

function escapear(String) {
  return String.trim()
    .replace("~", "/\~")
    .replace("#", "/\#")
    .replace("=", "/\=")
    .replace("}", "/\}")
    .replace("{", "/\{")
    .replace(":", "/\:");
}

function descapear(String) {
  return String.trim()
    .replace("/\~", "~")
    .replace("/\#", "#")
    .replace("/\=", "=")
    .replace("/\}", "}")
    .replace("/\{", "{")
    .replace("/\:", ":");
}
