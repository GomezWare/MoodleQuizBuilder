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

let btnGenArchivo = document.querySelector("#genArchivo");
btnGenArchivo.addEventListener("click", generarArchivo);
//////////////
//FUNCTION //
////////////

function arranque() {
  if (!localStorage.getItem("Cuestionario") == "") {
    let preguntas = localStorage.getItem("Cuestionario");
    preguntas = JSON.parse(preguntas);
    preguntas.forEach((p) => {
      p.toHTMLUL = function () {
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
    Cuestionario.preguntas = preguntas;
    mostrarPreguntas();
  } else {
    alert("Todavía no hay preguntas creada");
    localStorage.setItem("Cuestionario", "");
    //Se crea el cuestionario en objetos.js
  }
}

function generarArchivo() {
  let arrPreguntas = localStorage.getItem("Cuestionario");
  arrPreguntas = JSON.parse(arrPreguntas);

  let arrContenido = [];

  arrPreguntas.forEach((p) => {
    arrContenido.push(`${p.texto} \n`);
    arrContenido.push(`{\n`);
    arrContenido.push(`"=... ${p.rC}\n`);
    arrContenido.push(`~%-25%${p.rI[0]}\n`);
    arrContenido.push(`~%-25%${p.rI[1]}\n`);
    arrContenido.push(`~%-25%${p.rI[2]}\n`);
    arrContenido.push(`}\n`);
  });

  let fichero = new File(arrContenido, { type: "text/plain; charset=UTF-8" });
  var url = window.URL.createObjectURL(fichero);
  let divURL = document.querySelector("#urlFichero");

  let flechita = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-big-down-lines-filled" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M9 8l-.117 .007a1 1 0 0 0 -.883 .993v1.999l-2.586 .001a2 2 0 0 0 -1.414 3.414l6.586 6.586a2 2 0 0 0 2.828 0l6.586 -6.586a2 2 0 0 0 .434 -2.18l-.068 -.145a2 2 0 0 0 -1.78 -1.089l-2.586 -.001v-1.999a1 1 0 0 0 -1 -1h-6z" stroke-width="0" fill="currentColor" />
  <path d="M15 2a1 1 0 0 1 .117 1.993l-.117 .007h-6a1 1 0 0 1 -.117 -1.993l.117 -.007h6z" stroke-width="0" fill="currentColor" />
  <path d="M15 5a1 1 0 0 1 .117 1.993l-.117 .007h-6a1 1 0 0 1 -.117 -1.993l.117 -.007h6z" stroke-width="0" fill="currentColor" />
</svg>`;

  divURL.innerHTML =
    '<a download="preguntas.txt" href="' +
    url +
    '">Descargar fichero (' +
    flechita +
    ")</a>";

  console.log(arrPreguntas);
}

function savePreguntas() {
  localStorage.setItem("Cuestionario", JSON.stringify(Cuestionario.preguntas));
}

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
    .replaceAll("~", "/\~")
    .replaceAll("#", "/\#")
    .replaceAll("=", "/\=")
    .replaceAll("}", "/\}")
    .replaceAll("{", "/\{")
    .replaceAll(":", "/\:");
}

function descapear(String) {
  return String.trim()
    .replaceAll("/\~", "~")
    .replaceAll("/\#", "#")
    .replaceAll("/\=", "=")
    .replaceAll("/\}", "}")
    .replaceAll("/\{", "{")
    .replaceAll("/\:", ":");
}
