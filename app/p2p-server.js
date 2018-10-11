const Websocket = require('ws')

const P2P_PORT = process.env.P2P_PORT || 5001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [] 
// ws://localhost:5001 - this is a peer address
// PEERS = ws://localhost:5001,ws://localhost:5002

class P2pServer {
    constructor(blockchain) {
        this.blockchain = blockchain
        this.sockets = []
    }

    listen() {
        const server = new Websocket.Server({ port: P2P_PORT })
        server.on('connection', socket => this.connectSocket(socket))

        this.connectToPeers()

        console.log(`Listening for peer-to-peer connections: ${P2P_PORT}`)
    }

    connectToPeers() {
        peers.forEach(peer => {
            // peer will have an address similar to the address above
            const socket = new Websocket(peer)

            socket.on('open', () => this.connectSocket(socket))
        })
    }

    connectSocket(socket) {
        this.sockets.push(socket)
        console.log('Socket connected')
    }
}

module.exports = P2pServer