'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Shippers", {
      id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        ShipperName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        Phone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Shippers")
  }
};
