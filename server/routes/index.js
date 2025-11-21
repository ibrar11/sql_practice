const express = require("express");
const router = express.Router();
const customers = require('./customers');
const products = require('./products');
const orders = require('./orders');

router.use("/customers",customers)
router.use("/products",products)
router.use("/products",orders)

module.exports = router;