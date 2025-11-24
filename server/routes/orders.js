const express = require('express');
const router = express.Router();
const ordersController = require('../app/http/controllers/orders')

router.get("/",ordersController.getOrders)
router.post("/",ordersController.addOrders)

module.exports = router;