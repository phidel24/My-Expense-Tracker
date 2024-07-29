const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const sequelize = require('./backend/database/models/index');
const authRoutes = require('./routes/auth.route');
const expenseRoutes = require('./routes/expense.route');
const getUsers = require('./backend/services/user.service');
const { getUserExpenses, addExpense } = require('./backend/services/expense.service');  // Correctly import functions
const {getCategories} = require('./backend/services/category.service');

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'no longer a secret', 
    resave: false,
    saveUninitialized: false
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

function authenticateUser(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.render('login');
    }
}

app.get('/expenses', authenticateUser, async (req, res) => {
    try {
        const userId = req.session.user.id;
        const userExpenses = await getUserExpenses(userId);
        const totalAmount = userExpenses.reduce((total, expense) => {
            console.log("Expense amount:", expense.amount, typeof expense.amount);
            return total + expense.amount;
        }, 0);
        console.log("logging the amount for confirmation: ", totalAmount);
        console.log("logging the type for confirmation: ", typeof totalAmount);

        res.render('expenses', { user: req.session.user, expenses: userExpenses, totalAmount: totalAmount });
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/addExpense', authenticateUser, async (req, res) => {
    try {
        const userId = req.session.user.id;
        const categoriesInstances = await getCategories();
        const categories = categoriesInstances.map(category => ({
            id: category.id,
            name: category.name
        }));
        res.render('addExpense', { categories, userId });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 3001;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Error syncing database:', error);
});
