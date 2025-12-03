'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("OrderShippings", {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
      },
      OrderID: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Orders",
            key: "id"
          }
      },
      shipCountry: {
          type: Sequelize.STRING,
          allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("OrderShippings")
  }
};
