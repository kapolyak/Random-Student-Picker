const express = require('express');
const classRoutes = require('./class');
const presentRoutes = require('./present');
const studentRoutes = require('./student');
// const spRoutes = require('./sp');

module.exports = (sqlite) => {
  let router = express.Router();

  router.use('/class', classRoutes(sqlite));
  router.use('/present', presentRoutes(sqlite));
  router.use('/student', studentRoutes(sqlite));
  // router.use('/sp', spRoutes(sqlite));

  return router;
};
