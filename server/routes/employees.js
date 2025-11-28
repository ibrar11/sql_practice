const express = require("express");
const router = express.Router();
const employeesController = require("../app/http//controllers/employees")

router.get("/",employeesController.filteredEmployeesData)
router.post("/",employeesController.addEmployeesData)

module.exports = router;