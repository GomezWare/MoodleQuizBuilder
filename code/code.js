"use strict";
// GLOBAL
////
var divPreguntas = document.querySelector("#divPreguntas"); //Esta es la variable global correspondiente al div donde iran las preguntas
var divErrores = document.querySelector("#divErrores"); //Esta es la variable global donde se mostraran los errores
var contadorIDs = 0; //Contador encargado de ir asignandole ids a las preguntas cuando se van generando

//////////
//MAIN //
////////
arranque(); // Cada vez que carga la aplicacion web se ejecutara este metodo

//EVENT LISTENERS
/////

/*Estos Event listener controlan los eventos onclick de los 4 botones situados en el formulario */
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
  /*Cuando carga la pagina web  */
  if (!localStorage.getItem("Cuestionario") == "") {
    //Si no existe el localStorage, se crea y se muestra una alerta
    let preguntas = localStorage.getItem("Cuestionario");
    /*Se parsea del localStorage el array de Preguntas el objeto cuestionario, sin metodos por ser un JSON*/
    preguntas = JSON.parse(preguntas);
    preguntas.forEach((p) => {
      /*Este bucle recorre el array recuperado y le introduce a cada pregunta su metodo otra vez */
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
    Cuestionario.preguntas = preguntas; //Finalmente se introduce de nuevo en el Cuestionario

    contadorIDs = localStorage.getItem("contadorSav"); //Se recupera tambien el contador para poder seguir generando preguntas
    mostrarPreguntas(); //Se actualiza la division
  } else {
    localStorage.setItem("Cuestionario", "");
    mostrarPreguntas();
    //Se crea el Cuestionario en objetos.js
  }
}

function generarArchivo() {
  /*Este metodo es el encargado de general el archivo en formato .gift*/
  divErrores.innerHTML = ""; //Primero se limpia la division errores

  if (!localStorage.getItem("Cuestionario") == "") {
    // Se comprueba que haya preguntas en el localStorage
    let arrPreguntas = localStorage.getItem("Cuestionario");
    // Se recuperan las preguntas y se meten en un array
    arrPreguntas = JSON.parse(arrPreguntas);

    let arrContenido = []; //Se crea el array del contenido del fichero

    arrPreguntas.forEach((p) => {
      /*Por cada pregunta se va esceibiendo el fichero con el formato especifico .gift incluyendo los caracteres escapeados y los saltos de linea*/
      arrContenido.push(`${p.texto} \n`);
      arrContenido.push(`{\n`);
      arrContenido.push(`"=... ${p.rC}\n`);
      arrContenido.push(`~%-25%${p.rI[0]}\n`);
      arrContenido.push(`~%-25%${p.rI[1]}\n`);
      arrContenido.push(`~%-25%${p.rI[2]}\n`);
      arrContenido.push(`}\n`);
    });


    let fichero = new File(arrContenido, { type: "text/plain; charset=UTF-8" }); //Se crea un fichero con codificacion UTF-8
    var url = window.URL.createObjectURL(fichero); //Se crea la url con el obejeto fichero como parametro
    let divURL = document.querySelector("#urlFichero"); //Se recupera la division del divURL

    // Se añade el enlace para que el usuario pueda descargarlo
    divURL.innerHTML =
      '<a download="preguntas.txt" href="' +
      url +
      '">Descargar fichero (📄)</a>';
  } else {
    /*Si no se ha recuperado ninguna pregunta sale el mensaje de error*/
    divErrores.innerHTML = "<h1>No has guardado ninguna pregunta</h1>"; 
  }
}

function savePreguntas() {
  /*Este metodo guarda las preguntas y el contador en el localStorage*/
  localStorage.setItem("Cuestionario", JSON.stringify(Cuestionario.preguntas));
  localStorage.setItem("contadorSav", contadorIDs);
}

function delPreguntas() {
  /*Esta funcion borra todas las preguntas */
  localStorage.setItem("Cuestionario", ""); //Se borra el localStorage
  Cuestionario.preguntas = []; // Se borra el cuestionario
  mostrarPreguntas(); //Se actualiza la pantalla
  contadorIDs = 0; // Se resetea el contador de IDs
}

function guardarPregunta() {
  //Se recuperan los datos de los inputs y se borran los espacios para que no haya accidentes con espacios

  let texto = String(document.querySelector("#texto").value).trim();

  let rC = String(document.querySelector("#rC").value).trim();

  let rI1 = String(document.querySelector("#rI1").value).trim();

  let rI2 = String(document.querySelector("#rI2").value).trim();

  let rI3 = String(document.querySelector("#rI3").value).trim();

  if (validateInputs(texto, rC, rI1, rI2, rI3)) {
    // Si la validacion es correcta se descapea
    texto = escapear(texto);
    rC = escapear(rC);
    rI1 = escapear(rI1);
    rI2 = escapear(rI2);
    rI3 = escapear(rI3);

    let rI = [rI1, rI2, rI3]; // Aqui estaria el array de respuestas incorrectas

    let id = contadorIDs; // Aqui se asignaria un id nuevo
    contadorIDs++; // Se prepara un nuevo id

    let oPregunta = new Pregunta(id, texto, rC, rI); //Se crea la pregunta

    Cuestionario.addPregunta(oPregunta); // Se añade al cuestionario

    mostrarPreguntas(); //Se muestran las preguntas
  }
}

function recuperarPregunta(id) {
  //Se obtiene el indice de la pregunta con el id introducido y se recupera
  const index = Cuestionario.preguntas.findIndex((p) => p.id === id);
  let pRecuperada = Cuestionario.getPregunta(index); //Se utiliza el metodo getPregunta para poder recuperar la pregunta

  //Se deveulve el contenido de la pregunta a los inputs pero descapeado
  document.querySelector("#texto").value = descapear(pRecuperada.texto);
  document.querySelector("#rC").value = descapear(pRecuperada.rC);
  document.querySelector("#rI1").value = descapear(pRecuperada.rI[0]);
  document.querySelector("#rI2").value = descapear(pRecuperada.rI[1]);
  document.querySelector("#rI3").value = descapear(pRecuperada.rI[2]);
}

//AUXILIAR FUNCTIONS
//////

function mostrarPreguntas() {
  /*Esta funcion pinta el Div generado por el metodo de Cuestionario*/
  if (Cuestionario.preguntas.length == 0) {
    //Si no hay elementos en el array mostrara el siguiente mensaje
    divPreguntas.innerHTML = "<h1>Todavía no hay preguntas creadas.</h1>";
  } else {
    divPreguntas.innerHTML = "";
    Cuestionario.preguntas.forEach((p) => {
      divPreguntas.innerHTML += Cuestionario.preguntaToHTMLDiv(p.id);
    });
  }
}

function validateInputs(texto, rC, rI1, rI2, rI3) {
  /*Esta funcion auxiliar se encarga de comprobar que todos los campos del formulario estan rellenos*/
  // Valida inputs y muestra errores//

  /*Se hace la comprobacion, edemas es aprueba de poner un solo espacio en el input  */
  if (
    texto.length == 0 ||
    rC.length == 0 ||
    rI1.length == 0 ||
    rI2.length == 0 ||
    rI3.length == 0
  ) {
    /*Si no estan rellenos los campos se mostrara un error y se devolvera falso */
    divErrores.innerHTML = `<h1>Rellene todos los campos</h1>`;
    return false;
  } else {
    /*Si todo es corracto se limpia el div de errores y se manda un true*/

    divErrores.innerHTML = "";
    return true;
  }
}

function escapear(String) {
  /* Este metodo simplemente escapea el String que le pases*/
  return String.replaceAll("~", "/~")
    .replaceAll("#", "/\#")
    .replaceAll("=", "/\=")
    .replaceAll("}", "/\}")
    .replaceAll("{", "/\{")
    .replaceAll(":", "/\:");
}

function descapear(String) {
  /* Este metodo recibe un string escapeado y lo restaura*/
  return String.replaceAll("/~", "~")
    .replaceAll("/\#", "#")
    .replaceAll("/\=", "=")
    .replaceAll("/\}", "}")
    .replaceAll("/\{", "{")
    .replaceAll("/\:", ":");
}
