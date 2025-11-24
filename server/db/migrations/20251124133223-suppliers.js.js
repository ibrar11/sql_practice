'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Suppliers",{
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
      },
      SupplierName: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      ContactName: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      Address: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      City: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      PostalCode: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      Country: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      Phone: {
          type: Sequelize.STRING,
          allowNull: false,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Suppliers")
  }
};
