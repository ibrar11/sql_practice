const express = require('express');
const router = express.Router();
const customersController = require('../app/http/controllers/customers')

router.get("/", customersController.getCustomers);
router.get("/distinctCustomers", customersController.getDistinctCustomers);

module.exports = router;