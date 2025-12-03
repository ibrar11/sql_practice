const express = require('express')
const router = express.Router();
const orderShippingsController = require('../app/http/controllers/orderShippings')

router.post("/",orderShippingsController.addShippingDetails)

module.exports = router;