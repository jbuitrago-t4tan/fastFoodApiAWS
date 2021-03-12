'use strict';

//Definición librerías.

//Librería encargada de las peticiones.
const express = require('express');

//Librería encargada de parsear los datos de la petición.
const bodyParser = require('body-parser');

//Librería encargada de realizar la interacción entre servicios de AWS.
const AWS = require('aws-sdk');

//Librería encargada de realizar la inicialización de express.
const app = express();

//Especificación de uso bodyParser.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(require('./src/routes/index.routes'));

module.exports = app;