const express = require('express');
const { getCart, addToCart } = require('../controllers/cart');
const { authenticate } = require('../middlewares/Auth.middleware');

const router = express.Router();

router.get("/", authenticate, getCart);
router.post("/add", authenticate, addToCart);

module.exports = router;