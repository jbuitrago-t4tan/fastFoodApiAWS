const joi = require('joi');
const validRequestObjects = [
    'body',
    'cookies',
    'headers',
    'params',
    'query',
];

module.exports = (request, schema) => {

    if (!schema) {
        return null;
    }

    if (typeof schema !== 'object') {
        return { error: 'Enter a valid schema' }
    }

    let keys = Object.keys(schema);
    if (keys.length === 0) {
        return null;
    }

    keys = keys.filter(k => validRequestObjects.indexOf(k) > -1);
    if (keys.length == 0) {
        return null;
    }

    let result;
    for (let i = 0; i < keys.length; i++) {
        const element = keys[i];
        result = joi.validate(request[element], schema[element]);
        if (result.error !== null) {
            break;
        }
    }

    if (result.error === null) {
        return null;
    } else {
        return { errors: result.error.details };
    }

}
