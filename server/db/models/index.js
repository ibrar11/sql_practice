const env = process.env.NODE_ENV || 'development';
const fs = require('fs');
const Sequelize = require('sequelize');
const config = require(__dirname + '/../../config/config.js')[env];
const path = require('path');
const basename = path.basename(module.filename);
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function (file) {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.authenticate()
  .then(() => { console.log("DB connection successful."); })
  .catch(err => {
    console.log("ERROR establishing DB connection.", err);
  });

module.exports = db;