const bcrypt = require('bcrypt');
const saltRounds = 10;
const sequelize = require('../database/models');
const User = sequelize.models.User;

async function userSignup (req, res) {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { username }})
        if (existingUser) {
            return res.status(400).send('Username exists!')
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await User.create({ username, email, password: hashedPassword });
        
        req.session.signupSuccess = true;                
        res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
};

async function userLogin (req, res) {
    const { username, password } = req.body;
    
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send('Invalid password');
        }
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email
        };
        res.redirect('/expenses');
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
};

function userLogout (req, res) {
    res.status(200).send('Logout successful');
};

module.exports = { userLogin, userSignup, userLogout }