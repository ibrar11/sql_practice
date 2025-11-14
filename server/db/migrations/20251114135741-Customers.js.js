'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Customers", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      CustomerName: {
        type: Sequelize.STRING
      },
      ContactName: {
        type: Sequelize.STRING
      },
      Address: {
        type: Sequelize.STRING
      },
      City: {
        type: Sequelize.STRING
      },
      PostalCode: {
        type: Sequelize.INTEGER
      },
      Country: {
        type: Sequelize.STRING
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Customers")
  }
};
