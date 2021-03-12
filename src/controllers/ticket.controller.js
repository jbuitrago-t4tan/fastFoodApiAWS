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
const FastFoodTicket = require("../models/fastFoodTicket");

// Dynamo Tables
const TICKET_TABLE = process.env.TICKET_TABLE;
const MENU_TABLE = process.env.MENU_TABLE;

// RM-1: Create ticket
module.exports.create_ticket = (req, res) => {
  const { ccClient, userNameClient } = req.body;
  const menuId = req.query.menuId;

  var params = {
    TableName: TICKET_TABLE,
  };

  doClient.scan(params, (err, data) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        statusCode: 500,
        message: "An error ocurred creating new ticket!",
        error: err,
      });
    }

    if (!data.Items || data.Items.length < 6) {
      const newTicket = new FastFoodTicket({
        ccClient,
        userNameClient,
        menuId,
        requestDate: new Date(),
      });

      newTicket.save((err, createdTicket) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            statusCode: 500,
            message: "An error ocurred saving new ticket!",
            error: err,
          });
        } else {
          return res.json({
            ok: true,
            statusCode: 200,
            message: "A new ticket was add!",
            ticket: createdTicket,
          });
        }
      });
    } else {
      logger.warning('The restaurant is full!');
      return res.status(403).json({
        ok: false,
        statusCode: 403,
        message: "The restaurant is full",
        clients: data.Items,
      });
    }
  });
};

// RM-2: Get table information by id(ticket and menu)
module.exports.get_restaurant_table = (req, res) => {
  const ccClient = req.query.ccClient;

  var params = {
    TableName: TICKET_TABLE,
    Key: {
      ccClient: ccClient,
    },
  };

  doClient.get(params, (err, result) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        statusCode: 500,
        message: "An error ocurred",
        error: err,
      });
    }
    if (!result.Item) {
      logger.warning('There is not a ticket with this id');
      return res.status(404).json({
        ok: false,
        statusCode: 404,
        message: "there isn't ticket with this id",
      });
    } else {
      return res.json({
        ok: true,
        statusCode: 200,
        ticket: result.Item,
      });
    }
  });
};


// RM-3: Get tables information 
module.exports.get_tables_information = (req, res) => {

    var params = {
        TableName: TICKET_TABLE,
    };

    doClient.scan(params, ( err, results ) => {

        if(err){
            return res.status(500).json({
                ok: false,
                statusCode: 500,
                message: 'a problem was ocurred',
                error: err
            });
        }

        if(!results.Items){
            return res.status(403).json({
                ok: false,
                statusCode: 403,
                message: "do not have any tables right now!",
            });
        }else{
            return res.json({
                ok:true,
                statusCode: 200,
                message: "Successful",
                tables: results.Items
            });
        }
    });
};
// RM-4: Remove a ticket!
module.exports.remove_table = (req,res) => {
    
    const ccClient = req.query.ccClient;

    var params = {
        TableName:TICKET_TABLE,
        Key:{
            "ccClient": ccClient
        }
    };

    doClient.delete(params, ( err, data ) => {

        if(err){
            return res.status(500).json({
                ok: false,
                statusCode: 500,
                message: 'a problem was ocurred',
                error: err
            });
        }

        return res.json({
            ok: true,
            statusCode: 200,
            message: 'An item was deleted',
            data: {
                ccClient: ccClient
            }
        });
    });
};

// RM-5: Test implementation 
module.exports.test_implementation = (req, res) => {
  const {userName, userId, testName} = req.body;

  if(testName === 'hello world!'){
    return res.status(400).json({
      ok:false,
      statusCode: 400,
      message: 'error'
    });
  } 
  if(userName === 'NAME' && userId === 'USERID'){
    return res.status(403).json({
      ok:false,
      statusCode: 403,
      message: 'error here!'
    });
  }
  return res.json({
    ok: true,
    statusCode: 200,
    result: {
      userName,
      userId
    }
  });

};

