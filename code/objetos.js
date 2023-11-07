"use strict";

let Cuestionario = {
  preguntas: [],
  addPregunta: function (oPregunta) {
    this.preguntas.push(oPregunta);
  },
  descartarPregunta(id) {
    let index = "error";

    for (let i = 0; i < this.preguntas.length; i++) {
      let p = this.preguntas[i];

      if (p.id == id) {
        index = id;
      }
    }

    if (this.preguntas.length == 1) {
      alert("Todavía no hay preguntas creadas");
    } else {
      this.preguntas.splice(index, 1);
      mostrarPreguntas();
    }
  },
  preguntaToHTMLDiv(id) {
    let oPregunta = null;
    for (let i = 0; i < this.preguntas.length; i++) {
      if (this.preguntas[i].id == id) {
        oPregunta = this.preguntas[i];
      }
    }

    let elementoDIV = `<div id="${id}"> `;
    elementoDIV += `${oPregunta.toHTMLUL()}`;
    elementoDIV += `<button onclick="Cuestionario.descartarPregunta(${oPregunta.id})">Descartar pregunta</button>`;
    elementoDIV += `<button onclick="recuperarPregunta(${oPregunta.id})">Recuperar pregunta</button>`;
    elementoDIV += `</div>`;

    return elementoDIV;
  },
  getPregunta(i) {
    let oPregunta = this.preguntas[i];

    return oPregunta;
  },
};

// Constructor de pregunta
function Pregunta(id, texto, rC, rI) {
  this.id = id;
  this.texto = texto;
  this.rC = rC;
  this.rI = rI;

  this.toHTMLUL = function () {
    //TODO Funcion añadir pregunta
    let elementoUL = `<ul>`;
    elementoUL += `<li>${this.texto}</li>`;
    elementoUL += `<li>${this.rC}</li>`;

    this.rI.forEach((inc) => {
      elementoUL += `<li>${inc}</li>`;
    });

    elementoUL += `</ul>`;
    return elementoUL;
  };
}
