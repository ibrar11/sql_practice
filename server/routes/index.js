const express = require("express");
const router = express.Router();
const customers = require('./customers');
const products = require('./products');
const orders = require('./orders');
const categories = require('./categories');
const suppliers = require('./suppliers');
const shippers = require('./shippers');
const employees = require('./employees');
const orderShippings = require('./orderShippings');

router.use("/customers",customers)
router.use("/products",products)
router.use("/orders",orders)
router.use("/categories",categories)
router.use("/suppliers",suppliers)
router.use("/shippers",shippers)
router.use("/employees",employees)
router.use("/orderShippings",orderShippings)

module.exports = router;