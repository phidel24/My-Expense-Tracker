const sequelize = require('../database/models');
const Expense = sequelize.models.Expense;
const { addExpense: addExpenseService, getUserExpenses: getUserExpensesService } = require('../services/expense.service');

async function addExpense(req, res) {
    console.log("POST getting userid => ::: ", JSON.stringify(req.session.user));
    console.log("Logging addExpense method from app.js ::");

    try {
        const { title, amount, userId, categoryId, category, description } = req.body;
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
        const userExpenses = await getUserExpensesService(userId);
        const totalAmount = userExpenses.reduce((total, expense) => {
            console.log("Expense amount:", expense.amount, typeof expense.amount);
            return total + expense.amount;
        }, 0);
        console.log("logging the amount for confirmation: ", totalAmount);
        console.log("logging the type for confirmation: ", typeof totalAmount);

        res.render('expenses', { user: req.session.user, expenses: userExpenses, totalAmount: totalAmount });
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