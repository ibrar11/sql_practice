const express = require("express");
const router = express.Router();
const customers = require('./customers');
const products = require('./products')

router.use("/customers",customers)
router.use("/products",products)

module.exports = router;