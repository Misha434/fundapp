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

contract('Greeter: update greeting', () => {
    describe('setGreeting(string)', () => {
        it("sets greeting to passed in string", async() => {
            const greeter = await GreeterContract.deployed();
            const expected = 'Hi there!';
            await greeter.setGreeting(expected);

            const actual = await greeter.greet();

            assert.equal(actual, expected, "greet was not updated.'")
        })
    })
})
