app.post('/addExpense', async (req, res) => {
    console.log("POST getting userid => ::: ", JSON.stringify(req.session.user));
    console.log("Logging addExpense method from app.js ::");

    try {
        const { title, amount, userId, categoryId, category, description } = req.body;
        console.log("getting body => ::: ", JSON.stringify(req.body));

        const newExpense = await createExpense(userId, title, category, categoryId, amount, description);
        res.status(201).send('Expense added successfully!');
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).send('Internal Server Error');
    }
});