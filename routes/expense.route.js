const express = require('express');
const router = express.Router();
const { getUserExpenses, addExpense, getExpenseById, updateExpense, deleteExpense } = require('../backend/controllers/expenseController');
const { getCategories } = require('../backend/services/category.service');

function authenticateUser(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

router.post('/add', addExpense);
router.get('/', getUserExpenses);

router.get('/', authenticateUser, async (req, res) => {
    try {
        const userId = req.session.user.id;
        const userExpenses = await getUserExpenses(userId);
        const totalAmount = userExpenses.reduce((total, expense) => {
            console.log("Expense amount:", expense.amount, typeof expense.amount);
            return total + expense.amount;
        }, 0);

        res.render('expenses', { user: req.session.user, expenses: userExpenses, totalAmount: totalAmount });
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/addExpense', authenticateUser, async (req, res) => {
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

// Edit expense route
router.get('/edit/:id', async (req, res) => {
    try {
        const expenseId = req.params.id;
        const userId = req.session.user.id;
        const expense = await getExpenseById(expenseId);
        const categories = await getCategories();
        res.render('editExpense', { expense, categories });
    } catch (error) {
        console.error('Error fetching expense for editing:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Update expense route
router.post('/edit/:id', async (req, res) => {
    const expenseId = req.params.id;
    const { title, amount, categoryId, description } = req.body;
    
    try {
        await updateExpense(expenseId, title, amount, categoryId, description);
        res.redirect('/expenses?message=Expense updated successfully!');
    } catch (error) {
        console.error('Error updating expense:', error);

        try {
            const expense = await getExpenseById(expenseId); 
            const categories = await getCategories();
            
            res.render('editExpense', { 
                expense, 
                categories, 
                errorMessage: error.message
            });
        } catch (fetchError) {
            console.error('Error fetching expense or categories:', fetchError);
            res.status(500).send('Internal Server Error');
        }
    }
});

// Delete expense route
router.get('/delete/:id', async (req, res) => {
    try {
        const expenseId = req.params.id;
        await deleteExpense(expenseId);
        res.redirect('/expenses?message=Expense deleted successfully!');
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
