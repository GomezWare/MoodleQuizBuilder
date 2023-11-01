"use strict";
//OBJETOS

let cuestionario = {
  preguntas: [],
  addPregunta(Pregunta) {
    this.preguntas.push(Pregunta);
  },

  /*TODO Buscar la manera de meter este objeto en el localstorage, quizas se pueda con un JSON Stringify y 
  luego recuperar el propio objeto y sub-ojetos(array) con un JSON to Object???
   */
};

function Pregunta(nombre, rCorrecta, rIncorrecta1, rIncorrecta2, rIncorrecta3) {
  this.nombre = nombre;
  this.rCorrecta = rCorrecta;
  this.rIncorrecta1 = rIncorrecta1;
  this.rIncorrecta2 = rIncorrecta2;
  this.rIncorrecta3 = rIncorrecta3;

  //TODO Esto tiene que devolver un DIV con los datos de arriba
  this.preguntaToHTMLDiv = function () {};
}
