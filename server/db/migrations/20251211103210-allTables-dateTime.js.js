
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add columns to all tables
    const tables = [
      'Categories',
      'Customers', 
      'Employees',
      'Shippers',
      'Suppliers',
      'Products',
      'Orders',
      'OrderDetails',
      'OrderShippings'
    ];

    // Add createdAt and updatedAt columns to each table
    for (const table of tables) {
      await queryInterface.addColumn(table, 'createdAt', {
        type: Sequelize.DATE,
        allowNull: true
      });
      
      await queryInterface.addColumn(table, 'updatedAt', {
        type: Sequelize.DATE,
        allowNull: true
      });
    }

    // Now populate with realistic timestamps in correct dependency order
    console.log('Populating timestamps...');

    // 1. Categories (8 records): Created in early 2020
    await queryInterface.sequelize.query(`
      UPDATE "Categories" 
      SET 
        "createdAt" = CASE 
          WHEN id = 1 THEN TIMESTAMPTZ '2020-01-10 08:30:00+00'
          WHEN id = 2 THEN TIMESTAMPTZ '2020-01-11 09:15:00+00'
          WHEN id = 3 THEN TIMESTAMPTZ '2020-01-12 10:00:00+00'
          WHEN id = 4 THEN TIMESTAMPTZ '2020-01-13 11:30:00+00'
          WHEN id = 5 THEN TIMESTAMPTZ '2020-01-14 14:45:00+00'
          WHEN id = 6 THEN TIMESTAMPTZ '2020-01-15 15:20:00+00'
          WHEN id = 7 THEN TIMESTAMPTZ '2020-01-16 16:10:00+00'
          WHEN id = 8 THEN TIMESTAMPTZ '2020-01-17 17:00:00+00'
        END,
        "updatedAt" = CASE 
          WHEN id = 1 THEN TIMESTAMPTZ '2020-01-17 08:30:00+00'
          WHEN id = 2 THEN TIMESTAMPTZ '2020-01-18 09:15:00+00'
          WHEN id = 3 THEN TIMESTAMPTZ '2020-01-12 10:00:00+00'
          WHEN id = 4 THEN TIMESTAMPTZ '2020-01-20 11:30:00+00'
          WHEN id = 5 THEN TIMESTAMPTZ '2020-01-14 14:45:00+00'
          WHEN id = 6 THEN TIMESTAMPTZ '2020-01-22 15:20:00+00'
          WHEN id = 7 THEN TIMESTAMPTZ '2020-01-23 16:10:00+00'
          WHEN id = 8 THEN TIMESTAMPTZ '2020-01-17 17:00:00+00'
        END;
    `);

    // 2. Customers (91 records): Created throughout 2020
    await queryInterface.sequelize.query(`
      UPDATE "Customers"
      SET 
        "createdAt" = DATE '2020-01-01' + (INTERVAL '1 day' * (id * 4 % 365)) + (INTERVAL '1 hour' * (9 + (id % 8))),
        "updatedAt" = DATE '2020-01-01' + (INTERVAL '1 day' * (id * 4 % 365)) + (INTERVAL '1 hour' * (9 + (id % 8))) + 
                     CASE WHEN id % 4 = 0 THEN INTERVAL '30 days' ELSE INTERVAL '0 days' END;
    `);

    // 3. Employees (10 records): Created in early 2020
    await queryInterface.sequelize.query(`
      UPDATE "Employees"
      SET 
        "createdAt" = DATE '2020-02-01' + (INTERVAL '1 day' * (id - 1)) + INTERVAL '10 hours',
        "updatedAt" = DATE '2020-02-01' + (INTERVAL '1 day' * (id - 1)) + INTERVAL '10 hours';
    `);

    // 4. Shippers (3 records): Created early 2020
    await queryInterface.sequelize.query(`
      UPDATE "Shippers"
      SET 
        "createdAt" = DATE '2020-01-01' + (INTERVAL '1 day' * (id - 1)) + INTERVAL '11 hours',
        "updatedAt" = DATE '2020-01-01' + (INTERVAL '1 day' * (id - 1)) + INTERVAL '11 hours';
    `);

    // 5. Suppliers (29 records): Created throughout early 2020
    await queryInterface.sequelize.query(`
      UPDATE "Suppliers"
      SET 
        "createdAt" = DATE '2020-01-01' + (INTERVAL '3 days' * (id - 1)) + INTERVAL '14 hours',
        "updatedAt" = DATE '2020-01-01' + (INTERVAL '3 days' * (id - 1)) + INTERVAL '14 hours';
    `);

    // 6. Products (77 records): Created after suppliers and categories (Feb-Apr 2020)
    await queryInterface.sequelize.query(`
      UPDATE "Products"
      SET 
        "createdAt" = DATE '2020-02-01' + (INTERVAL '1 day' * (id - 1)) + INTERVAL '15 hours',
        "updatedAt" = DATE '2020-02-01' + (INTERVAL '1 day' * (id - 1)) + INTERVAL '15 hours' + 
                     CASE WHEN id % 3 = 0 THEN INTERVAL '15 days' ELSE INTERVAL '0 days' END;
    `);

    // 7. Orders (196 records): Created throughout 2020-2021
    await queryInterface.sequelize.query(`
      UPDATE "Orders"
      SET 
        "createdAt" = CASE 
          WHEN id <= 60 THEN DATE '2020-03-01' + (INTERVAL '1 day' * (id - 1)) + INTERVAL '10 hours'
          WHEN id <= 120 THEN DATE '2020-06-01' + (INTERVAL '1 day' * (id - 61)) + INTERVAL '14 hours'
          WHEN id <= 180 THEN DATE '2021-01-01' + (INTERVAL '1 day' * (id - 121)) + INTERVAL '11 hours'
          ELSE DATE '2021-06-01' + (INTERVAL '1 day' * (id - 181)) + INTERVAL '16 hours'
        END,
        "updatedAt" = CASE 
          WHEN id <= 60 THEN DATE '2020-03-01' + (INTERVAL '1 day' * (id - 1)) + INTERVAL '10 hours' + 
                           CASE WHEN id % 2 = 0 THEN INTERVAL '1 day' ELSE INTERVAL '0 days' END
          WHEN id <= 120 THEN DATE '2020-06-01' + (INTERVAL '1 day' * (id - 61)) + INTERVAL '14 hours' + 
                           CASE WHEN id % 2 = 0 THEN INTERVAL '1 day' ELSE INTERVAL '0 days' END
          WHEN id <= 180 THEN DATE '2021-01-01' + (INTERVAL '1 day' * (id - 121)) + INTERVAL '11 hours' + 
                           CASE WHEN id % 2 = 0 THEN INTERVAL '1 day' ELSE INTERVAL '0 days' END
          ELSE DATE '2021-06-01' + (INTERVAL '1 day' * (id - 181)) + INTERVAL '16 hours' + 
               CASE WHEN id % 2 = 0 THEN INTERVAL '1 day' ELSE INTERVAL '0 days' END
        END;
    `);

    // 8. OrderDetails (518 records): Created same day as orders
    await queryInterface.sequelize.query(`
      UPDATE "OrderDetails"
      SET 
        "createdAt" = (
          SELECT "createdAt" + INTERVAL '1 hour' * ("OrderDetails".id % 24)
          FROM "Orders" 
          WHERE "Orders".id = "OrderDetails"."OrderID"
        ),
        "updatedAt" = (
          SELECT "createdAt" + INTERVAL '1 hour' * ("OrderDetails".id % 24) + 
                 CASE WHEN "OrderDetails".id % 3 = 0 THEN INTERVAL '1 hour' ELSE INTERVAL '0 hours' END
          FROM "Orders" 
          WHERE "Orders".id = "OrderDetails"."OrderID"
        );
    `);

    // 9. OrderShippings (196 records): Created after orders
    await queryInterface.sequelize.query(`
      UPDATE "OrderShippings"
      SET 
        "createdAt" = (
          SELECT "createdAt" + INTERVAL '2 hours'
          FROM "Orders" 
          WHERE "Orders".id = "OrderShippings"."OrderID"
        ),
        "updatedAt" = (
          SELECT "createdAt" + INTERVAL '2 hours'
          FROM "Orders" 
          WHERE "Orders".id = "OrderShippings"."OrderID"
        );
    `);

    // Make columns NOT NULL after populating data
    for (const table of tables) {
      await queryInterface.changeColumn(table, 'createdAt', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      });
      
      await queryInterface.changeColumn(table, 'updatedAt', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      });
    }

    console.log('Timestamp population completed successfully!');
  },

  async down(queryInterface, Sequelize) {
    // Remove columns from all tables
    const tables = [
      'OrderShippings',
      'OrderDetails',
      'Orders',
      'Products',
      'Suppliers',
      'Shippers',
      'Employees',
      'Customers',
      'Categories'
    ];

    for (const table of tables) {
      await queryInterface.removeColumn(table, 'createdAt');
      await queryInterface.removeColumn(table, 'updatedAt');
    }
  }
};