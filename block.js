const SHA256 = require('crypto-js/sha256')

class Block {
    constructor({timestamp, lastHash, hash, data}) {
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
    }

    toString() {
        return `Block -
            Timestamp: ${this.timestamp}
            Last Hash: ${this.lastHash.substring(0,15)}
            Hash     : ${this.hash.substring(0, 15)}
            Data     : ${this.data}`
    }

    static genesis() {
        return new this({
            timestamp: 'Genesis Time',
            lastHash: '-----',
            hash: 'b00bi3s-rgr8m8',
            data: []
        })
    }

    static mineBlock(lastBlock, data) {
        const timestamp = Date.now()
        const lastHash = lastBlock.hash
        const hash = Block.hash(timestamp, lastHash, data)
        const block = { timestamp, lastHash, hash, data }
        return new this(block)
    }

    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString()
    }
}

module.exports = Block