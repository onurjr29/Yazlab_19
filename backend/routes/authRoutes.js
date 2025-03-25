const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);  // ✅ e-Devlet kontrol burada yapılır
router.post('/login', login);

module.exports = router;
