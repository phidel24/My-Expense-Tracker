const bcrypt = require('bcrypt');
const saltRounds = 10;
const { body, validationResult } = require('express-validator');
const sequelize = require('../database/models');
const User = sequelize.models.User;

const signupValidationRules = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage('Username must be between 3 and 20 characters.'),
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address.'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.')
];

async function userSignup(req, res) {
    const { username, email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array();
        console.log("Validation errors found:", formattedErrors);
        return res.status(400).json({ errors: formattedErrors });
    }

    try {
        const existingUser = await User.findOne({ where: { username } });
        const existingEmail = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists.' }); // Sending a single error object
        }
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists.' }); // Sending a single error object
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({ username, email, password: hashedPassword });
        
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ errors: [{ msg: 'Server error, please try again later.' }] });
    }
}

const loginValidationRules = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required.'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required.')
];

const userLogin = async (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt:", username, password);

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            console.log("User not found");
            return res.status(401).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Incorrect password");
            return res.status(401).json({ error: "Incorrect password" });
        }

        req.session.userId = user.id;  
        req.session.user = { id: user.id, username: user.username, email: user.email };

        console.log("Login successful");
        console.log("Session after login:", req.session); 
        return res.json({ message: "Login successful" });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Server error" });
    }
};

function userLogout(req, res) {
    req.session.destroy();
    res.status(200).send('Logout successful');
};

module.exports = { userLogin, userSignup, userLogout, signupValidationRules, loginValidationRules };