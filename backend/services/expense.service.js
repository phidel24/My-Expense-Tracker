const sequelize = require('../database/models');
const Expense = sequelize.models.Expense;
const {createCategory} = require('../services/category.service');

async function getUserExpenses(userId) {
    try {
        const expenses = await Expense.findAll({ where: { userId } });
        console.log("getUserExpenses => ", expenses, typeof expenses);
        return expenses;
    } catch (error) {
        console.log('Error fetching expenses:', error);
        throw error;
    }
}

async function addExpense(userId, title, category, categoryId, amount, description) {
    console.log("Logging addExpense method ::",);
    console.log(`userId = ${userId}, title = ${title}, category = ${category}, categoryId = ${categoryId}, amount = ${amount}, description = ${description},`);

    try {
        let newExpense;
        console.log(`categoryId => ${categoryId}, category => ${category}`);

        if (!category) {
            newExpense = await Expense.create({ userId, title, amount, categoryId, description });
        } else {
            //create new catId then use it to create expense 
            let resolvedCategoryId = await createCategory(category)
            newExpense = await Expense.create({ userId, title, amount, categoryId: resolvedCategoryId, description });
        }
        console.log("Logging newExpense => ::", newExpense);

        return newExpense;
    } catch (error) {
        console.log('Error adding expense:', error);
        throw error;
    }
}

// Retrieve expense by ID
async function getExpenseById(expenseId) {
    try {
        const expense = await Expense.findByPk(expenseId);
        if (!expense) {
            throw new Error('Expense not found');
        }
        return expense;
    } catch (error) {
        console.error('Error fetching expense:', error);
        throw error;
    }
}

// Update expense
async function updateExpense(expenseId, title, amount, categoryId, description) {
    try {
        await Expense.update(
            { title, amount, categoryId, description },
            { where: { id: expenseId } }
        );
    } catch (error) {
        console.error('Error updating expense:', error);
        throw error;
    }
}

// Delete expense
async function deleteExpense(expenseId) {
    try {
        await Expense.destroy({ where: { id: expenseId } });
    } catch (error) {
        console.error('Error deleting expense:', error);
        throw error;
    }
}

module.exports = { getUserExpenses, addExpense, getExpenseById, updateExpense, deleteExpense };