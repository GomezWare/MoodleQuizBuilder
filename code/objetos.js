"use strict";

/**
 *   El Objeto cuestionario, tiene un Array de Objetos preguntas y la mayoria de metodos principales que se utilizan en esta aplicacion
 */
let Cuestionario = {
  preguntas: [],

  addPregunta: function (oPregunta) {
    //addPregunta, recibe un Objeto tipo pregunta y lo mete en el array
    this.preguntas.push(oPregunta);
  },
  descartarPregunta(id) {
    /*descartarPregunta, recibe una id como parametro de entrada y busca en el array
    la pregunta que coincida con dicho id, y la recupera */
    let index = "error";

    for (let i = 0; i < this.preguntas.length; i++) {
      let p = this.preguntas[i];

      if (p.id == id) {
        index = id;
      }
    }

    /*Si es la unica pregunta que queda, esta no se descartara*/
    if (this.preguntas.length == 1) {
      alert("Todavía no hay preguntas creadas");
    } else {
      this.preguntas.splice(index, 1); // Aqui se utiliza la funciom Splice para no dejar huecos
      mostrarPreguntas(); // Se muestra la lista de preguntas actualizada
    }
  },
  preguntaToHTMLDiv(id) {
    /*Muy parecido al metodo de arriba, recibe un id, busca en el array la pregunta correspondiente 
    y recupera el objeto pregunta*/

    let index = null;
    for (let i = 0; i < this.preguntas.length; i++) {
      if (this.preguntas[i].id == id) {
        index = i;
      }
    }
    let oPregunta = this.getPregunta(index); // Se utiliza el metodo get pregunta para obtener la pregunta desde el indice
    /*Se crea el div que contendra todo el contenido de*/
    let elementoDIV = `<div id="${id}"> `;
    elementoDIV += `${oPregunta.toHTMLUL()}`;
    /*Este es sistema para recuperar las preguntas, tanto la division como los propios botones tienen el id referenciado, 
    los botones utilizaran este como parametro de entrada */
    elementoDIV += `<button onclick="Cuestionario.descartarPregunta(${oPregunta.id})">Descartar pregunta</button>`;
    elementoDIV += `<button onclick="recuperarPregunta(${oPregunta.id})">Recuperar pregunta</button>`;
    elementoDIV += `</div>`;

    return elementoDIV; // Devuelve el elemento DIV
  },
  getPregunta(i) {
    //Recibe el indice o posicion referente al array de preguntas
    let oPregunta = this.preguntas[i];

    return oPregunta;
    //Devuelve la pregunta correspondiente
  },
};

/**
 * Basicamente una pregunta, consiste en un ID la cual la identifica, un texto, la respuesta correcta
 * y un array que contiene 3 respuestas incorrectas
 *
 * @param {*} id
 * @param {*} texto
 * @param {*} rC
 * @param {*} rI
 */
function Pregunta(id, texto, rC, rI) {
  this.id = id;
  this.texto = texto;
  this.rC = rC;
  this.rI = rI;

  this.toHTMLUL = function () {
    /* Este metodo devuelve un UL con el contenido de la pregunta */
    let elementoUL = `<ul>`; //Se crea el elemento UL
    elementoUL += `<li>${this.texto}</li>`;
    elementoUL += `<li>${this.rC}</li>`;

    this.rI.forEach((inc) => {
      //Este bucle es para poner las 3 respuestas incorrectas en la lista
      elementoUL += `<li>${inc}</li>`;
    });

    elementoUL += `</ul>`;
    return elementoUL; //Se devuelve el elemento UL
  };
}
