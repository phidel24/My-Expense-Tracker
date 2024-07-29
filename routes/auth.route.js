const express = require('express');
const router = express.Router();
const { userLogin, userSignup, userLogout } = require('../backend/controllers/authController');enses = require('../backend/services/expense.service');

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/logout', userLogout);

module.exports = router;