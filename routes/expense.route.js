const express = require('express');
const router = express.Router();
const { getUserExpenses, addExpense, getExpenseById, updateExpense, deleteExpense } = require('../backend/controllers/expenseController');
const { getCategories } = require('../backend/services/category.service');

router.post('/add', addExpense);
router.get('/expenses', getUserExpenses);

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
    try {
        const expenseId = req.params.id;
        const { title, amount, categoryId, description } = req.body;
        await updateExpense(expenseId, title, amount, categoryId, description);
        res.redirect('/expenses?message=Expense updated successfully!');
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).send('Internal Server Error');
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
