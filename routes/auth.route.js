const express = require('express');
const router = express.Router();
const { userLogin, userSignup, userLogout, signupValidationRules, loginValidationRules } = require('../backend/controllers/authController');

router.post('/signup', signupValidationRules, userSignup);
router.post('/login', loginValidationRules, userLogin);
router.post('/logout', userLogout);

module.exports = router;