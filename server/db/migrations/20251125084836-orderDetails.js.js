'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("OrderDetails", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      OrderID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Orders",
          key: "id"
        }
      },
      ProductID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id"
        }
      },
      Quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("OrderDetails")
  }
};
