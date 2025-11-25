'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Employees", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      LastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      FirstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      BirthDate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Photo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Notes: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Employees")
  }
};
