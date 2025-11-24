const express = require("express");
const router = express.Router();
const categoriesController = require("../app/http//controllers/categories")

router.post("/",categoriesController.addCategoriesData)

module.exports = router;