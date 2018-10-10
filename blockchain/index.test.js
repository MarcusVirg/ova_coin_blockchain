const Blockchain = require('.')
const Block = require('./block')

describe('Blockchain', () => {
    let bc, bc2
    
    beforeEach(() => {
        bc = new Blockchain()
        bc2 = new Blockchain()
    })

    it('starts with the genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis())
    })

    it('adds a new block', () => {
        const data = 'foo'
        bc.addBlock(data)
        expect(bc.chain[bc.chain.length - 1].data).toEqual(data)
    })

    it('validates a chain', () => {
        bc2.addBlock('foo')

        expect(bc.isValidChain(bc2.chain)).toBe(true)
    })

    it('invalidates a chain with a corrupt genesis chain', () => {
        bc2.chain[0].data = 'Bad Data'

        expect(bc.isValidChain(bc2.chain)).toBe(false)
    })

    it('invalidates a corrupt chain', () => {
        bc2.addBlock('foo')
        bc2.chain[1].data = 'corrupted foo'

        expect(bc.isValidChain(bc2.chain)).toBe(false)
    })

    it('replaces the chain with a valid new chain', () => {
        bc2.addBlock('goo')
        bc.replaceChain(bc2.chain)

        expect(bc.chain).toEqual(bc2.chain)
    })

    it('does not replace chain with one of less then or equal to length', () => {
        bc.addBlock('foo')
        bc.replaceChain(bc2.chain)
        
        expect(bc.chain).not.toEqual(bc2.chain)
    })
})