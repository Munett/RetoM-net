function openFile(fileID) {
  var file = document.getElementById(fileID).click();
}

function loadFile(file, imageID) {
  var reader = new FileReader();
  reader.onload = function (e) {
      image = document.getElementById(imageID)//new Image();
      image.src = e.target.result;
      readOCR(image);
  }
  reader.readAsDataURL(file.files[0]);
}

function readOCR(image) {
  var data = OCRAD(image);
  //var data = "1231321241AD12EDA12EWQE212P<MEXGARCIA<LOPEZ<<CRISTINA<BRENDA<<<<<<<<1389679245MEX770626F0192372<<<<<<<<<<2"
  var i;
  //Obtenemos el codigo si es un passaporte
  var isPassport;
  for (i = 0; i < data.length; i++) {
    if(data.charAt(i) == 'P' && data.charAt(i+1) == '<'){
      data = data.substring(i+2, data.length);
      isPassport = true;
      break;
    }
  }

  //Verificamos si es Mexicano
  if("MEX" == data.substring(0, 3)){
    data = data.substring(3, data.length);
  }

  //Obtenemos el primer appellido
  var appellido1;
  for (i = 0; i < data.length; i++) {
    if(data.charAt(i) == '<'){
      appellido1 = data.substring(0, i);
      data = data.substring(i+1, data.length);
      break;
    }
  }

  //Obtenemos el segundo appellido
  var Appellido2;
  for (i = 0; i < data.length; i++) {
    if(data.charAt(i) == '<'){
      appellido2 = data.substring(0, i);
      data = data.substring(i+2, data.length);
      break;
    }
  }

  // Todos los nombres
  var nombre = "";
  for (i = 0; i < data.length; i++) {
    if(data.charAt(i) == '<'){
      nombre += data.substring(0, i) + " ";
      data = data.substring(i+1, data.length);
      i=0;
    }
    if(data.charAt(i) == '<' && data.charAt(i+1) == '<'){
      break;
    }
  }


// descarta todos los < entre los nombres y el num. de Pasapore
for (i = 0; i < data.length; i++) {
   if(!isNaN(data.charAt(i))){
     data = data.substring(i, data.length);
     break;
    }
 }

 var nuPasaporte;
 for (i = 0; i < data.length; i++) {
    if(data.charAt(i) =='M'){
     nuPasaporte = data.substring(0,i) ;
      data = data.substring(i+3,data.length);
    }
  }

  var curp;
  for (i = 0; i < data.length; i++) {

      if(data.charAt(i) == '<'){
      curp= data.substring(0,i) ;
      data = data.substring(i+3,data.length);
      break;
      }


   }

  test = document.getElementById("test");
  test.appendChild(document.createTextNode("Apellido1: " + appellido1));
  test.appendChild(document.createElement("br"));
  test.appendChild(document.createTextNode("Apellido2: " + appellido2));
  test.appendChild(document.createElement("br"));
  test.appendChild(document.createTextNode("Nombre(s): " + nombre));
  test.appendChild(document.createElement("br"));
  test.appendChild(document.createTextNode("Numero de Pasaporte: " + nuPasaporte));
  test.appendChild(document.createElement("br"));
  test.appendChild(document.createTextNode("Curp: " + curp));
  test.appendChild(document.createElement("br"));
  test.appendChild(document.createTextNode(data));

}
