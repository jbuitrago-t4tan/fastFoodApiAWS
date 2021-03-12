'use strict';

const { Schema } = require('dynamoose');
const dynamoose = require('dynamoose');

const menuSchema = new Schema({
    menuId: {
        type: String,
        hashKey: true
    },
    menuName: {
        type: String,
        required: true
    },
    menuPrice: {
        type: Number,
        required: true
    }

});

const MENU_TABLE = process.env.MENU_TABLE;

module.exports = dynamoose.model(MENU_TABLE, menuSchema);