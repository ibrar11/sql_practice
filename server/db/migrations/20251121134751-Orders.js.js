'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Orders",{
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      CustomerID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Customers",
          key: "id"
        },
        allowNull: false
      },
      EmployeeID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      OrderDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      ShipperID: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders")
  }
};
