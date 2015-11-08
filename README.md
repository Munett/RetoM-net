# RetoM-net
Desarrollo de OCR Pasaporte Mexicano

PassportGO! Es una aplicación web que nos permite leer un pasaporte, como imagen, y poder leer los datos del mismo. El lenguaje base es JavaScript. <br>

Procesos<br>
1) Subir imagen del pasaporte y escanearla, a través de la librería ocrad.js.<br>
2) Después de escanearla, obtenemos los datos (strings) del pasaporte. A través de varias funciones que recorren los strings hasta que encuentran con el símbolo estándar (<) para extraer ciertos caracteres de la cadena de texto, que representan un dato específico del pasaporte. <br> 
3) Se muestran los datos del pasaporte, de manera más comprensible, para que el usuario los pueda utilizar para identificación de la persona, ya sea para un trámite u otro fin. 
