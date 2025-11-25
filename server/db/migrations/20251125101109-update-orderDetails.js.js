'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let count = 1;
    for (let i = 10248; i <= 10443; i++) {
      await queryInterface.bulkUpdate(
        "OrderDetails",
        { OrderID: count },
        { OrderID: i }
      );

      count++;
    }
    await queryInterface.changeColumn("OrderDetails","OrderID",{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Orders",
        key: "id"
      }
    })
    await queryInterface.changeColumn("OrderDetails","ProductID",{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("OrderDetails", "OrderDetails_OrderID_fkey");
    await queryInterface.removeConstraint("OrderDetails", "OrderDetails_ProductID_fkey");
    let count = 1;
    for (let i = 10248; i <= 10443; i++) {
      await queryInterface.bulkUpdate(
        "OrderDetails",
        { OrderID: i },
        { OrderID: count }
      );

    count++;
  }
  }
};
