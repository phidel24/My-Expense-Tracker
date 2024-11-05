My Expense Tracker
==================

**My Expense Tracker** is a simple personal finance management application designed to help users track their expenses, categorize them, and manage their spending. Built using Node.js, Express, and Sequelize, this project provides a seamless and intuitive way to monitor and organize your finances.

Project Description
-------------------

My Expense Tracker application allows users to:

*   **Add Expenses:** Record new expenses with details such as title, amount, category, and description.
    
*   **Edit Expenses:** Modify existing expense entries.
    
*   **Delete Expenses:** Remove unwanted expense records.
    
*   **View Expenses:** Display a list of all expenses and categorize them for better management.
    

### Technologies Used

*   **Node.js:** A JavaScript runtime used for building the server-side of the application.
    
*   **Express:** A web application framework for Node.js that simplifies routing and server-side logic.
    
*   **Sequelize:** An ORM for managing database interactions with PostgreSQL.
    
*   **PostgreSQL:** The relational database used to store user data and expenses.
    
*   **EJS:** A templating engine for rendering dynamic HTML views.
    

### Challenges and Future Features

**Challenges:**

*   Implementing seamless user authentication and session management.
    
*   Ensuring responsive and user-friendly UI/UX design.
    

**Future Features:**

*   **User Authentication:** Adding user registration and login functionalities.
    
*   **Advanced Reporting:** Generating reports, graphs based on expenses.
    
*   **Mobile Optimization:** Enhancing mobile responsiveness for better accessibility.
    

Installation
------------

Follow these steps to set up and run the project locally:

1.  git clone https://github.com/phidel24/My-Expense-Tracker.git
    
2.  cd My-Expense-Tracker 
    
3.  npm install
      
## Setup your database: 
4. Open your database client eg(postgres, MYSQL Workbench)

5. Create a new database for the project (e.g., `my_expense_tracker`, `expense_tracker_db`)
```sql
   CREATE DATABASE expense_tracker_db;

6. Run migrations to set up tables: npx sequelize-cli db:migrate

7. Optionally, run seeders if you want some sample data: npx sequelize-cli db:seed:all

8. Create a .env file in the root directory with the following content:
codeDB\_HOST=localhostDB\_USER=your\_db\_userDB\_PASS=your\_db\_passwordDB\_NAME=my\_expense\_trackerSESSION\_SECRET=your\_session\_secret

OR ```plaintext
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=my_expense_tracker
SESSION_SECRET=your_session_secret
```
    
9.  Run 'npm start' on terminal - The application will be accessible at http://localhost:3000.
    

Usage
-----

*   **Add Expense:** Click on the addEXpense to navigate to /addExpense and create a new expense entry.
    
*   **View Expenses:** Go to /expenses to see a list of all expenses.
    
*   **Edit Expense:** Click on the edit icon next to an expense to modify its details.
    
*   **Delete Expense:** Click on the delete icon next to an expense to remove it.
    

API Endpoints
-------------

*   **GET /expenses**: Retrieve all expenses.
    
*   **POST /expenses/add**: Add a new expense.
    
*   **GET /expenses/edit/**: Show the edit form for a specific expense.
    
*   **POST /expenses/edit/**: Update a specific expense.
    
*   **GET /expenses/delete/**: Delete a specific expense.
    

Database Schema
---------------

*   **User**: Stores user details.
    
    *   id: Integer, primary key
        
    *   username: String
        
    *   password: String (hashed)
        
*   **Category**: Stores expense categories.
    
    *   id: Integer, primary key
        
    *   name: String
        
*   **Expense**: Stores expense records.
    
    *   id: Integer, primary key
        
    *   title: String
        
    *   amount: Float
        
    *   userId: Integer, foreign key to User
        
    *   categoryId: Integer, foreign key to Category
        
    *   description: String
        
    *   createdAt: Date
        
    *   updatedAt: Date
        

Credits
-------

*   [**Fidelia Isu-Oko**](https://github.com/phidel24) - Project Developer
    

Special thanks to the tutorials and documentation provided by [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), and [Sequelize](https://sequelize.org/).

This project also utilizes OpenAI's ChatGPT to assist with some coding suggestions, organise/editing my documentation.

License
-------

This project is licensed under the MIT License. See the LICENSE file for details.
