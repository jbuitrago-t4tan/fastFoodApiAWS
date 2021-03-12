'use strict'


const express = require('express');
const app = express();

//Declaración de las rutas en el documento index (general)
app.use(require('./menu.routes'));
app.use(require('./ticket.routes'));


module.exports = app;