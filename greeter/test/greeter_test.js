const GreeterContract = artifacts.require('Greeter');

contract('Greeter', () => {
    it('has been deployed successfully.', async () => {
        const greeter = await  GreeterContract.deployed();
        assert(greeter, 'contract was not deployed.')
    })
    
    describe('greet()', () => {
        it("returns 'Hello world!'", async() => {
            const greeter = await GreeterContract.deployed();
            const expected = 'Hello world!';
            const actual = await greeter.greet();

            assert.equal(actual, expected, "greeted with 'Hello world!'")
        })
    })
})
