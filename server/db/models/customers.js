'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  var Customers = sequelize.define('Customers', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      CustomerName: {
        type: DataTypes.STRING
      },
      ContactName: {
        type: DataTypes.STRING
      },
      Address: {
        type: DataTypes.STRING
      },
      City: {
        type: DataTypes.STRING
      },
      PostalCode: {
        type: DataTypes.INTEGER
      },
      Country: {
        type: DataTypes.STRING
      },
    }, {
      tableName: 'Customers',
      timestamps: false
    })

  Customers.associate = function (models) {
    Customers.hasMany(models.Orders)
  }
  
  return Customers;
};