const express = require("express");
const router = express.Router();
const suppliersControllers = require("../app/http/controllers/suppliers")

router.post("/",suppliersControllers.addSupplierData);

module.exports = router;