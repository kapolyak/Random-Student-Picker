const express = require('express')
const server = express()
const parser = require('body-parser')
const helpers = require('./../sheets/helpers.js');

server.use(parser.json())
server.use(express.static(__dirname + '/../dist'))

server.post('/sp', (req, res) => {
  let winner = req.body.winner;
  require('./../sheets/googleAuth.js')((auth) => {
    helpers.writeWinnerToSheet(auth, winner, () => {
      res.send();
    });
  });
})

const port = 4000
server.listen(port, () => console.log(`now listening on port ${port}`))