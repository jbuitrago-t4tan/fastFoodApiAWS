'use strict';

const { Schema } = require('dynamoose');
const dynamoose = require('dynamoose');

const ticketSchema = new Schema({
    ccClient: {
        type: String,
        hashKey: true
    },
    userNameClient: {
        type: String,
        required: true
    },
    menuId: {
        type: String,
        required: true
    },
    requestDate: {
        type: Date,
        required: true
    }

});

const TICKET_TABLE = process.env.TICKET_TABLE;

module.exports = dynamoose.model(TICKET_TABLE, ticketSchema);