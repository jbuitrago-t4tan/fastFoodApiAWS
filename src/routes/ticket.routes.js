'use strict';

//  Get services
const { Router } = require('express');

const ticketController = require('../controllers/ticket.controller');

//  Initializations 
const router = Router();

//  Menu routes
router.post('/api/fastfood/ticket', ticketController.create_ticket);
router.get('/api/fastfood/ticket/table', ticketController.get_restaurant_table);
router.post('/api/fastfood/ticket/test', ticketController.test_implementation);
router.get('/api/fastfood/ticket', ticketController.get_tables_information)
router.delete('/api/fastfood/ticket', ticketController.remove_table);

module.exports = router;