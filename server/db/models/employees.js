'use strict';
module.exports = (sequelize, DataTypes) => {

  var Employees = sequelize.define('Employees', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      FirstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      BirthDate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Photo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Notes: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      createdAt: {
          type: DataTypes.DATE,
          allowNull: true
      },
      updatedAt: {
          type: DataTypes.DATE,
          allowNull: true
      }
    })

    Employees.associate = function (models) {
        Employees.hasMany(models.Orders)
    }
  
  return Employees;
};