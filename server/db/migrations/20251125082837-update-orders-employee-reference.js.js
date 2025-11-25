'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Orders","EmployeeID",{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Employees",
        key: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Orders","EmployeeID",{
      type: Sequelize.INTEGER,
      allowNull: false,
    })
  }
};
