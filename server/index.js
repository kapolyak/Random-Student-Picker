// Requirements
const express = require('express');
const apiHandler = require('./api/routes');
// const helpers = require('./../sheets/helpers.js');
const dbConfig = require('./.db/dbconfig');
const Sequelize = require('sequelize');

// Begin Application
const db = new Sequelize(dbConfig.sqlite.options);
const PORT = 4000;

const server = express();

// Connect to DB
db.authenticate()
  .then((result) => {
    console.log('DB Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

dbConfig.sqlite.db = db;
// TODO: Remove parser; Current version of Express (4.16.^): built in Parser
// https://expressjs.com/en/4x/api.html
// const parser = require('body-parser')
// server.use(parser.json());
// Use this instead
server.use(express.json());

server.use(express.static(__dirname + '/../dist'));

server.use('/api', apiHandler(dbConfig.sqlite));

// TODO: Remove below, Moved to api handlers
// Server.post('/sp' /* ambiguous: Spell out */ , (req, res) => {
//   let winner = req.body.winner;
//   require('./../sheets/googleAuth.js')((auth) => {
//     helpers.writeWinnerToSheet(auth, winner, () => {
//       res.send();
//     });
//   });
// });

server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
