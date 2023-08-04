const express = require('express');
const { getCart, addToCart, deleteItem } = require('../controllers/cart');
const { authenticate } = require('../middlewares/Auth.middleware');

const router = express.Router();

router.get("/", authenticate, getCart);
router.post("/add", authenticate, addToCart);
router.delete("/:id", authenticate, deleteItem);
router.put("/:id", authenticate, deleteItem)

module.exports = router;