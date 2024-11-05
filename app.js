require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const sequelize = require('./backend/database/models/index');
const authRoutes = require('./routes/auth.route');
const expenseRoutes = require('./routes/expense.route');
const getUsers = require('./backend/services/user.service');

app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: new SequelizeStore({
        db: sequelize
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', async (req, res) => {
    res.render('login');
});

app.get('/signup', async (req, res) => {
    res.render('signup');
});

app.get('/users', async (req, res) => {
    try {
        const users = await getUsers();
        res.render('users', { users: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
    app.listen(PORT, '0.0.0.0', () => { 
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Error syncing database:', error);
});
