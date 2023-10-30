//OBJETOS

let cuestionario = {
  preguntas: [],
  addPregunta(Pregunta){
    this.preguntas.push(Pregunta);
  }
};

function Pregunta(nombre, rCorrecta, rIncorrecta1, rIncorrecta2, rIncorrecta3) {
  this.nombre = nombre;
  this.rCorrecta = rCorrecta;
  this.rIncorrecta1 = rIncorrecta1;
  this.rIncorrecta2 = rIncorrecta2;
  this.rIncorrecta3 = rIncorrecta3;

  //Esto tiene que devolcer un DIV con los datos de arriba
  this.preguntaToHTMLDiv = function () {};
}
