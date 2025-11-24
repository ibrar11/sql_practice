'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Products","SupplierId",{
      type: Sequelize.INTEGER,
      references: {
        model: "Suppliers",
        key: "id",
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Products","SupplierId",{
      type: Sequelize.INTEGER,
    })
  }
};
