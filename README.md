PassportGO!
======
## Manual de Usuario

PassportGO! Es una aplicación web que le permite al usuario leer un pasaporte, como imagen, y poder leer los datos del mismo.

Es una aplicación súper sencilla e interactiva para el usuario.

A continuación, se mostrará los pasos a seguir para usar PassportGO!:

1. Abre cualquier navegador web, de tu preferencia.

2. Ingresa la dirección en donde se ubica la aplicación web: RetoM-net/index.html

3. Sube la imagen de tu pasaporte. Haz clic en cualquier parte del espacio asignado para la imagen.

4. De inmediato, aparecerá de lado derecho, los datos principales del usuario: Nombre, Apellido Paterno, Apellido Materno, Número de Pasaporte y CURP.

5. Para ingresar otra imagen de pasaporte, hay que dar clic en "Limpiar".

¡Listo! Ya puedes comenzar a utilizar la aplicación PassportGO!.

## Documentación Técnica

 1. index.css
 1. index.html
 1. index.js

### Index.css  
La plantilla de estilo para nuestra página principal de la aplicación web.

+ ***body:*** Contiene el estilo del cuerpo de la página web.

+ ***h1:*** Contiene el estilo del encabezado principal de la página web.

+ ***p:*** Contiene el estilo de los párrafos.

+ ***image:*** Contiene las dimensiones de la imagen y atributos.

+ ***file:*** Contiene los atributos de los archivos.

### Index.html
Está conformado por la estructura de nuestra página web.
Diferentes divisiones y contenedores, entre los cuales son:

+ ***container*** Contiene el encabezado principal de la página web. Título y descripción.

+ ***krContainer:*** Contiene el espacio dedicado para subir la imagen del pasaporte. Además, de lado derecho se encuentra el despliegue de la información del usuario según la foto agregada.

### Index.js
 + ***openFile:*** Este método permite seleccionar un archivo de imagen.

 + ***loadFile:*** Lee la imagen del cache y la muestra en la ventana.

 + ***readOCR:*** Envía la imagen a un Objeto de tipo OCRAD,
 mismo que se encargara de extraer el texto contenido en la imagen y lo retorna en la variable data.

 Data se itera en repetidas ocasiones en cada iteración se descartan datos innecesarios o se guardan los datos relevantes dentro de una variable que lo identifica. En el código esta comentado la función de cada iteración for. Aun así daremos una breve descripción.

**Elimina toda la información antes del código MRZ:** esta información traer datos innecesarios.  y verifica que si es un pasaporte ya que identifica los primeros caracteres del codigo los cuales son: P<, como confirmación adicionar los siguiente dato en el código es MEX, que identifica el país de origen.

**Obtener Apellido Paterno:** en la variable appellido1 guarda los caracteres que aparecen antes del primer '<', este símbolo es un espacio dentro del código MRZ.

 después de guardar el apellido se reduce el String data, para facilitar la búsqueda de los demás datos.


**Obtener Apellido Materno:**  identico al proceso anterior. empieza a leer los caracteres a parter de simbolo '<', y guarda los caracteres en la variable appellido2, si encuentra el siguiente simbolo '<' guarda el dato y reduce el String data.

**Obtener los nombre:** este for es un poco más complicado que los anteriores. debido a que busca todos los posibles nombres.

 durante la iteración de los caracteres del String data, si se encuentra un salto de linea '<', al texto de nombre concatena un espacio y los siguientes caracteres que encuentre.

 el ciclo solo se detendrá hasta que encuentre dos caracteres '<' seguidos, es buen momento para comentar que '<<' en el código MRZ representa un salto de linea.

**Eliminar información innecesaria:** en código MKZ existe una secuencia de caracteres '<' entre el dato que representa los nombres y el numero de pasaporte. el penúltimo for se encarga de eliminarlos para facilitar la búsqueda del ultimo dato necesario el Curp.

**Obtener el Curp:** la ultima iteración obtiene el Curp y descarta los últimos caracteres de data.
