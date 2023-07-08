const GreeterContract = artifacts.require('Greeter');

contract('Greeter', (accounts) => {
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

    describe('owner()', () => {
        it("returns the address of owner", async() => {
            const greeter = await GreeterContract.deployed();
            const owner = await greeter.owner();

            assert.equal(owner, 0x627306090abaB3A6e1400e9345bC60c78a8BEf57)
        })
        it("matches the address that originally deployed the contract", async() => {
            const greeter = await GreeterContract.deployed();
            const owner = await greeter.owner();
            const expected = accounts[0];

            assert.equal(owner, expected, 'matches address used to deploy contract')
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
