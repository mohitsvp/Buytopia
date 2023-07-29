const express = require('express');
const { getBrand, addBrand } = require('../controllers/product');

const router = express.Router();

router.get("/", getBrand);
router.post("/add", addBrand);

module.exports = router;