const Express = require('express');
const spControl = require('../../controllers/sp');

module.exports = (config) => {
  const Router = Express.Router();

  Server.post('/sp' /* ambiguous: Spell out */, (req, res) => {
    let winner = req.body.winner;
    require('../../../../sheets/googleAuth')((auth) => {
      helpers.writeWinnerToSheet(auth, winner, () => {
        res.send();
      });
    });
  });

  return Router;
};
