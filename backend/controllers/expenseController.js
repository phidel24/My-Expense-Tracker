const sequelize = require('../database/models');
const Expense = sequelize.models.Expense;
const { addExpense: addExpenseService, getUserExpenses: getUserExpensesService } = require('../services/expense.service');
const amountRegex = /^\d+(\.\d{1,2})?$/;

async function addExpense(req, res) {
    const { title, amount, userId, categoryId, category, description } = req.body;
   
    if (!title || typeof title !== 'string' || title.length < 2 || title.length > 50) {
        return res.status(400).json({ message: 'Invalid title. Ensure it is between 2 and 50 characters.' });
    }
    if (!amount || !amountRegex.test(amount) || parseFloat(amount) <= 0) {
        return res.status(400).json({ message: 'Invalid amount. Please provide a valid positive number.' });
    }
    if (description && typeof description !== 'string') {
        return res.status(400).json({ message: 'Invalid description.' });
    }

    try {
        console.log("getting body => ::: ", JSON.stringify(req.body));

        const newExpense = await addExpenseService(userId, title, category, categoryId, amount, description);
        res.status(201).json({message: 'Expense added successfully!'});
    } catch (error) {
        console.error('Failed to add expense:', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

// Get the user expenses
async function getUserExpenses(req, res) {
    try {
        const userId = req.session.user.id;
        if (!userId) {
            console.error("User ID is not set in the session");
            return res.status(401).json({ error: "Unauthorized" });
        }

        const userExpenses = await getUserExpensesService(userId); // Fetch user expenses based on userId
        const totalAmount = userExpenses.reduce((total, expense) => {
            console.log("Expense amount:", expense.amount, typeof expense.amount);
            return total + expense.amount;
        }, 0);

        res.render('expenses', { user: req.session.user, expenses: userExpenses, totalAmount });
    } catch (error) {
        console.error('Failed to fetch expenses:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function getExpenseById(expenseId) {
    try {
        const expense = await Expense.findByPk(expenseId);
        if (!expense) {
            throw new Error('Expense not found');
        }
        return expense;
    } catch (error) {
        console.error('Failed to retrieve expense:', error);
        throw error;
    }
}

// Update the expense
async function updateExpense(expenseId, title, amount, categoryId, description) {
    console.log('updateExpense called :::');

    if (!title || typeof title !== 'string' || title.length < 2 || title.length > 50) {
        throw new Error('Invalid title. Ensure it is between 2 and 50 characters.');
    }
    if (!amount || !amountRegex.test(amount) || parseFloat(amount) <= 0) {
        throw new Error('Invalid amount. Please provide a valid positive number.');
    }
    if (description && typeof description !== 'string') {
        throw new Error('Invalid description.');
    }

    try {
        await Expense.update(
            { title, amount, categoryId, description },
            { where: { id: expenseId } }
        );
        console.log('updateExpense updated :::');
    } catch (error) {
        console.error('Failed to update expense:', error);
        throw error;
    }
}

// Delete the expense
async function deleteExpense(expenseId) {
    try {
        await Expense.destroy({ where: { id: expenseId } });
    } catch (error) {
        console.error('Failed to delete expense:', error);
        throw error;
    }
}

module.exports = { getUserExpenses, addExpense, getExpenseById, updateExpense, deleteExpense };