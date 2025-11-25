'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Orders","ShipperID",{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Shippers",
        key: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Orders","ShipperID",{
      type: Sequelize.INTEGER,
      allowNull: false,
    })
  }
};
