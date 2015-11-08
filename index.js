function openFile(fileID) {
  var file = getById(fileID).click();
}

function loadFile(file, imageID) {
  var reader = new FileReader();
  reader.onload = function (e) {
      clean();
      image = getById(imageID);//new Image();
      image.style = "";
      image.src = e.target.result;
      canvas = editColor(image);
      data = readOCR(canvas);
      image.style.maxWidth = "80%";
      filldata(data);
  }
  reader.readAsDataURL(file.files[0]);
}

function editColor(imagen) {
  var r=0, g=0, b=0, count = 0, canvas, ctx, imageData, data, i;
  canvas = document.createElement('canvas');
  ctx = canvas.getContext("2d");
  canvas.width = imagen.width;
  canvas.height = imagen.height;
  ctx.drawImage(imagen, 0, 0);
  imageData = ctx.getImageData(0, 0, imagen.width, imagen.height);
  data = imageData.data;
  for(i = 0, n = data.length; i < n; i += 4) {
    ++count;
    data[i] = data[i] > 175 ? 255 : data[i];
    data[i+1] = data[i] > 175 ? 255 : data[i+1];
    data[i+2] = data[i] > 175 ? 255 : data[i+2];

    data[i] = data[i] < 75 ? 0 : data[i];
    data[i+1] = data[i] < 75 ? 0 : data[i+1];
    data[i+2] = data[i] < 75 ? 0 : data[i+2];
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas;
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
    alert("No es una imagen de pasaporte valida o no se pudo reconocer, intente de nuevo: ");
    clean();
    return;
  }

  //Verificamos si es Mexicano
  result.country = country[data.substring(0, 3)];
  data = data.substring(3, data.length);

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
    if(data.charAt(i) =='M' || data.charAt(i) =='<'){
     result.nuPasaporte = data.substring(0,i) ;
      data = data.substring(data.charAt(i) =='M' ? i+3 : i+2,data.length);
      break;
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
  getById("country").value = data.country;
}

function clean() {
  getById("nombre").value = "";
  getById("appellido1").value = "";
  getById("appellido2").value = "";
  getById("nuPasaporte").value = "";
  getById("curp").value = "";
  getById("country").value = "";
  getById("image").src = "subirimagen.png";
}

function getById(ID) {
  console.log(ID);
  return document.getElementById(ID);
}
