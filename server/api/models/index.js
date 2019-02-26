const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = (sequelize, force) => {
  const db = {};

  fs.readdirSync(__dirname)
    .filter((file) => {
      return file.indexOf('.') !== 0 && file !== 'index.js';
    })
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
  });

  db.sync = sequelize.sync(force ? { force: force } : null);

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};
