'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "category",
      [
        {
          name: "Meals",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { 
          name: 'Trips',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],

      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("category", null, {})
};
