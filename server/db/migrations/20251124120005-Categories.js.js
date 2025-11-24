'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Categories", {
      id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            aloowNull: false,
            primaryKey: true
        },
        CategoryName: {
            type: Sequelize.STRING,
            aloowNull: false
        },
        Description: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Categories")
  }
};
