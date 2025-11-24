'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Products","CategoryId",{
      type: Sequelize.INTEGER,
      references: {
        model: "Categories",
        key: "id",
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Products","CategoryId",{
      type: Sequelize.INTEGER,
    })
  }
};
