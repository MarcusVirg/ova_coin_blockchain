const SHA256 = require('crypto-js/sha256')

class Block {
    constructor({timestamp, prevHash, hash, data}) {
        this.timestamp = timestamp
        this.prevHash = prevHash
        this.hash = hash
        this.data = data
    }

    toString() {
        return `Block -
            Timestamp: ${this.timestamp}
            Last Hash: ${this.prevHash.substring(0,15)}
            Hash     : ${this.hash.substring(0, 15)}
            Data     : ${this.data}`
    }

    static genesis() {
        return new this({
            timestamp: 'Big Bang',
            prevHash: '-----',
            hash: 'b00bi3s-rgr8m8',
            data: []
        })
    }

    static mineBlock(prevBlock, data) {
        const timestamp = Date.now()
        const prevHash = prevBlock.hash
        const hash = Block.hash(timestamp, prevHash, data)
        const block = { timestamp, prevHash, hash, data }
        return new this(block)
    }

    static hash(timestamp, prevHash, data) {
        return SHA256(`${timestamp}${prevHash}${data}`).toString()
    }

    static blockHash({ timestamp, prevHash, data}) {
        return Block.hash(timestamp, prevHash, data)
    }
}

module.exports = Block