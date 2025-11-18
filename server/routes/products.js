const express = require('express');
const router = express.Router();
const productsController = require('../app/http/controllers/products')

router.get("/sortedProducts", productsController.getSortedProducts)
router.post("/addProducts", productsController.addProducts)

module.exports = router;