function openFile(fileID) {
  var file = getById(fileID).click();
}

function loadFile(file, imageID) {
  var reader = new FileReader();
  reader.onload = function (e) {
      image = getById(imageID);//new Image();
      image.src = e.target.result;
      data = readOCR(image);
      filldata(data);
  }
  reader.readAsDataURL(file.files[0]);
}

function readOCR(image) {
  var data = OCRAD(image).toUpperCase();
  var result = new Object();
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

  if(!isPassport){
    alert("No es una imagen de pasaporte valida o no se pudo reconocer, intente de nuevo");
    clean();
    return;
  }

  //Verificamos si es Mexicano
  if("MEX" == data.substring(0, 3)){
    data = data.substring(3, data.length);
  }

  //Obtenemos el primer appellido
  for (i = 0; i < data.length; i++) {
    if(data.charAt(i) == '<'){
      result.appellido1 = data.substring(0, i);
      data = data.substring(i+1, data.length);
      break;
    }
  }

  //Obtenemos el segundo appellido
  for (i = 0; i < data.length; i++) {
    if(data.charAt(i) == '<'){
      result.appellido2 = data.substring(0, i);
      data = data.substring(i+2, data.length);
      break;
    }
  }

  // Todos los nombres
  result.nombre = "";
  for (i = 0; i < data.length; i++) {
    if(data.charAt(i) == '<'){
      result.nombre += data.substring(0, i) + " ";
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

 for (i = 0; i < data.length; i++) {
    if(data.charAt(i) =='M'){
     result.nuPasaporte = data.substring(0,i) ;
      data = data.substring(i+3,data.length);
    }
  }

  for (i = 0; i < data.length; i++) {
      if(data.charAt(i) == '<'){
      result.curp= data.substring(0,i) ;
      data = data.substring(i+3,data.length);
      break;
      }


   }

  return result;
}

function filldata(data) {
  getById("nombre").value = data.nombre;
  getById("appellido1").value = data.appellido1;
  getById("appellido2").value = data.appellido2;
  getById("nuPasaporte").value = data.nuPasaporte;
  getById("curp").value = data.curp;
}

function clean() {
  getById("nombre").value = "";
  getById("appellido1").value = "";
  getById("appellido2").value = "";
  getById("nuPasaporte").value = "";
  getById("curp").value = "";
  getById("image").src = "subirimagen.png";
}

function getById(ID) {
  console.log(ID);
  return document.getElementById(ID);
}
