"use strict";

// Libraries definition
const uuid = require("uuid").v4;
const logger = require('@condor-labs/logger');

// Dynamo implementation
const AWS = require("aws-sdk");

const IS_OFFLINE = process.env.IS_OFFLINE;
let doClient;
if(IS_OFFLINE === 'true'){
  doClient = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  });
}else{
  doClient = new AWS.DynamoDB.DocumentClient();
}

//  Dynamoose Tables
const FastFoodMenu = require("../models/fastFoodMenu");

// Dynamo Tables
const MENU_TABLE = process.env.MENU_TABLE;

// RM-1: Create menu service
module.exports.create_menu = (req, res) => {
  const { menuName, menuPrice } = req.body;
  const menuId = uuid();

  const createMenu = new FastFoodMenu({
    menuId: menuId,
    menuName: menuName,
    menuPrice: menuPrice,
  });
  
  createMenu.save((err, newMenu) => {
    if (err) {
      logger.error(Error("Error in create menu... "));
      return res.status(500).json({
        ok: false,
        statusCode: 500,
        message: "An error was ocurred",
        error: err,
      });
    } else {
      logger.information({ ok: true, statusCode: 200, createdMenu: newMenu });
      return res.status(201).json({
        ok: true,
        statusCode:201,
        message: "A new menu was created",
        createdMenu: newMenu,
      });
    }
  });
};

// RM-2: Get all menus service
module.exports.get_all_menus = (req, res) => {

  // Scan parameters
  var params = {
    TableName: MENU_TABLE,
  };

  // Scan method: return all values
  doClient.scan(params, (err, menus) => {
    if (err) {
      res.status(500).json({
        ok: false,
        statusCode: 500,
        err,
      });
    } else {
      res.json({
        ok: true,
        statusCode: 200,
        menus,
      });
    }
  });
};

// RM-3: Delete a menu by id
module.exports.delete_menu_by_id = (req, res) => {
  const menuId = req.query.menuId;

  // Delete parameters
  var params = {
    TableName: MENU_TABLE,
    Key: {
      "menuId": menuId
    }
  };

  // Delete an item
  doClient.delete(params, function(err, data){
    if (err) {
      res.status(500).json({
        ok: false,
        statusCode: 500,
        err,
      });
    } else {
      res.json({
        ok: true,
        statusCode: 200,
        data:data,
      });
    }
  });
};


