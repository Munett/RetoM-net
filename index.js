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

  //Obtenemos el codigo si es un passaporte
  var isPassport;
  for (var i = 0; i < data.length; i++) {
    if(data.charAt(i) == 'p' && data.charAt(i+1) == '<'){
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
  for (var i = 0; i < data.length; i++) {
    if(data.charAt(i) == '<'){
      appellido1 = data.substring(0, i);
      data = data.substring(i, data.length);
      break;
    }
  }

  test = document.getElementById("test");
  test.appendChild(document.createTextNode("Apellido1: " + appellido1));
  test.appendChild(document.createElement("br"));
  test.appendChild(document.createTextNode(data));
}
