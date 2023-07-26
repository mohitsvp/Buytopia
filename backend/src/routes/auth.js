const express = require('express');
const { getUser, register, login } = require('../controllers/auth');

const router = express.Router();


router.get("/users", getUser);
router.post("/register", register)
router.post("/login", login);

module.exports = router;