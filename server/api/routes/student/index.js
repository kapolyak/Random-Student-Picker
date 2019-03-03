const express = require('express');

module.exports = (config) => {
  const router = express.Router();

  router.use('/student', (req, res) => {
    res.send({ Express: 'Student Route' });
  });

  return router;
};
