const express = require('express');
const { getProducts, addProduct, getProduct } = require('../controllers/product');

const router = express.Router();

router.get("/", getProducts);
router.post("/add", addProduct);
router.get("/:id", getProduct)

module.exports = router;