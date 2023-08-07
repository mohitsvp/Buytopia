const express = require('express');
const { getOrders, addOrder } = require('../controllers/order');
const { authenticate } = require('../middlewares/Auth.middleware');

const router = express.Router();

router.get("/", getOrders);
router.post("/add", authenticate, addOrder);

module.exports = router;