const express = require('express');
const router = express.Router();
const productsController = require('../app/http/controllers/products')

router.get("/sortedProducts", productsController.getSortedProducts)
router.get("/filteredProducts", productsController.getFilteredProducts)
router.post("/addProducts", productsController.addProducts)
router.delete("/:id", productsController.removeProducts)

module.exports = router;