const express = require('express');
const helpers = require('../../../../sheets/helpers');
// TODO: Configure Controller before uncommenting
// const spControl = require('../../controllers/sp');

module.exports = (config) => {
  const router = express.Router();

  rotuer.post('/' /* moved 'SP' to routes index */, (req, res) => {
    let winner = req.body.winner;
    require('../../../../sheets/googleAuth')((auth) => {
      helpers.writeWinnerToSheet(auth, winner, () => {
        res.send();
      });
    });
  });

  return router;
};
