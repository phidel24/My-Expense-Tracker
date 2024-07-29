'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "expense",
      [
        {
          userId: 1,
          title: "Dinner",
          amount: 23.50,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { 
          userId: 2,
          title: 'Vacation and transport',
          amount: 560.80,
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],

      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("expense", null, {})
};
