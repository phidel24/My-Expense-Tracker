'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'user',
    [
      {
        username: 'JaneDoe',
        email: 'janedoe@example.com',
        password: 'JaneDoe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'JonDoe',
        email: 'jondoe@example.com',
        password: 'JonDoe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('user', null, {}),
};
