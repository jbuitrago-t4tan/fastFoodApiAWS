'use strict';

//Librería encartada de realizar el puente entre express y serverless.
const serverlessHttp = require('serverless-http');

const app = require('./instance');

module.exports.fastFoodApi = serverlessHttp(app);