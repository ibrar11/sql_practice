const express = require("express");
const router = express.Router();
const shippersControllers = require("../app/http/controllers/shippers")

router.post("/",shippersControllers.addShipperData);

module.exports = router;