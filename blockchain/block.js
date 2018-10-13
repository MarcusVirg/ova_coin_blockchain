const SHA256 = require('crypto-js/sha256')
const { DIFFICULTY, MINE_RATE } = require('../config')

class Block {
    constructor({timestamp, prevHash, hash, data, nonce, difficulty}) {
        this.timestamp = timestamp
        this.prevHash = prevHash
        this.hash = hash
        this.data = data
        this.nonce = nonce
        this.difficulty = difficulty
    }

    toString() {
        return `Block -
            Timestamp : ${this.timestamp}
            Last Hash : ${this.prevHash.substring(0,15)}
            Hash      : ${this.hash.substring(0, 15)}
            Nonce     : ${this.nonce}
            Difficulty: ${this.difficulty}
            Data      : ${this.data}`
    }

    static genesis() {
        return new this({
            timestamp: 'Big Bang',
            prevHash: '-----',
            hash: 'b00bi3s-rgr8m8',
            data: [],
            nonce: 0,
            difficulty: DIFFICULTY
        })
    }

    static mineBlock(prevBlock, data) {
        let hash, timestamp
        const prevHash = prevBlock.hash
        let { difficulty } = prevBlock

        let nonce = 0
        do {
            nonce++
            timestamp = Date.now()
            difficulty = Block.adjustDifficulty(prevBlock, timestamp) // adjust difficulty
            hash = Block.hash(timestamp, prevHash, data, nonce, difficulty)
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty)) // Proof of work system

        const block = { timestamp, prevHash, hash, data, nonce, difficulty }
        return new this(block)
    }

    static hash(timestamp, prevHash, data, nonce, difficulty) {
        return SHA256(`${timestamp}${prevHash}${data}${nonce}${difficulty}`).toString()
    }

    static blockHash({ timestamp, prevHash, data, nonce, difficulty}) {
        return Block.hash(timestamp, prevHash, data, nonce, difficulty)
    }

    static adjustDifficulty(prevBlock, currentTime) {
        let { difficulty } = prevBlock
        difficulty = prevBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1
        return difficulty
    }
}

module.exports = Block