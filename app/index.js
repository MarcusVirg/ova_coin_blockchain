const express = require('express')
const bodyParser = require('body-parser')

const Blockchain = require('../blockchain')
const P2pServer = require('./p2p-server')

const HTTP_PORT = process.env.HTTP_PORT || 3001 // runs server on port 3001

const app = express()
const bc = new Blockchain()
const p2pServer = new P2pServer(bc)

app.use(bodyParser.json())

// Block endpoint
app.get('/blocks', (req, res) => {
    res.json(bc.chain)
})

// the mine endpoint to add a new block to the chain
app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data)
    console.log(`New block added:\n${block.toString()}`)
    res.redirect('/blocks')
})

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`))
p2pServer.listen()
