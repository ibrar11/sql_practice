const express = require("express");
const router = express.Router();
const customers = require('./customers');
const products = require('./products');
const orders = require('./orders');
const categories = require('./categories');
const suppliers = require('./suppliers');

router.use("/customers",customers)
router.use("/products",products)
router.use("/orders",orders)
router.use("/categories",categories)
router.use("/suppliers",suppliers)

module.exports = router;