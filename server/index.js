const express = require('express')
const server = express()
const parser = require('body-parser')

server.use(parser.json())
server.use(express.static(__dirname + '/../dist'))

const port = 4000
server.listen(port, () => console.log(`now listening on port ${port}`) )