const Path = require('path');

module.exports = {
  sqlite: {
    dbName: 'HRNYC_StudentPresentaions',
    options: {
      dialect: 'sqlite',
      storage: Path.resolve(__dirname, '../HRNYC_StudentPresentations.db'),
      logging: process.env.NODE_ENV === 'production' ? true : false
    }
  }
};
