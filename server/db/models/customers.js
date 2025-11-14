'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  var Customers = sequelize.define('Customers', {})
  
  return Customers;
};