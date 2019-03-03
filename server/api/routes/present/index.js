const express = require('express');

module.exports = (config) => {
  const router = express.Router();

  router.use('/present', (req, res) => {
    res.send({ Express: 'Present Route' });
  });

  return router;
};
