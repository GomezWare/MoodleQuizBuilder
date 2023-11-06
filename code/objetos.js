"use strict";

let Cuestionario = {
  preguntas: [],
  addPregunta: function (oPregunta) {
    //TODO Funcion añadir pregunta
  },
  descartarPregunta(id) {
    //TODO Funcion descartar pregunta
  },
  preguntaToHTMLDiv(id) {
    for (let i = 0; i < this.preguntas.length; i++) {
      if (this.preguntas[i].id === id) {
        let oPregunta = this.preguntas[i];
      }
    }

    elementoDIV = `<div id="${id}"> `;
    elementoDIV += `${oPregunta.toHTMLUL()}`;
    elementoDIV += `<button onclick="Cuestionario.descartarPregunta(${id})">Descartar pregunta</button>`;
    elementoDIV += `<button onclick="recuperarPregunta(${id})">Recuperar pregunta</button>`;

    elementoDIV += `</div>`;

    return elementoDIV;
  },
  getPregunta(i) {
    let oPregunta = this.preguntas[i];

    return oPregunta;
  },
};

function Pregunta(id, texto, respuestaCorrecta, respuestasIncorrecta) {
  this.id = id;
  this.texto = texto;
  this.respuestaCorrecta = respuestaCorrecta;
  this.respuestasIncorrecta = respuestasIncorrecta;

  this.toHTMLUL = function () {
    //TODO Funcion añadir pregunta
    let elementoUL = `<ul>`;
    elementoUL += `<li>${this.texto}</li>`;
    elementoUL += `<li>${this.respuestaCorrecta}</li>`;

    this.respuestasIncorrecta.forEach((incorrecta) => {
      elementoUL += `<li>${incorrecta}</li>`;
    });

    elementoUL += `</ul>`;
    return elementoUL;
  };
}
