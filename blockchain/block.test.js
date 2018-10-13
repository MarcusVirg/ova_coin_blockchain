const Block = require('./block')
const { DIFFICULTY } = require('../config')

describe('Block', () => {
    let data, prevBlock, block
    
    beforeEach(() => {
        data = 'bar'
        prevBlock = Block.genesis()
        block = Block.mineBlock(prevBlock, data)
    })

    it('sets the `data` to match the input given', () => {
        expect(block.data).toEqual(data)
    })

    it('sets the `prevHash` to match the hash of the last block', () => {
        expect(block.prevHash).toEqual(prevBlock.hash)
    })

    it('generates a hash that matches the difficulty', () => {
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty))
        console.log(block.toString())
    })

    it('lowers the difficulty for slowly mined blocks', () => {
       expect(Block.adjustDifficulty(block, block.timestamp + 360000)).toEqual(block.difficulty - 1)
    })
})