const Block = require('./block')

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
})