const { assert } = require("chai")

// import artifactMarketplaceSol from '../src/contracts/Marketplace.sol'
// const Marketplace = artifactMarketplaceSol

const Marketplace = artifacts.require('../src/contracts/Marketplace.sol')
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Marketplace', ([deployer, seller, buyer]) => {
    let marketplace

    before(async () => {
        marketplace = await Marketplace.deployed()
    })

    describe('deployment', async () => {
        it('deploys sucessfully', async () => {
            const address = await marketplace.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
            const name = await marketplace.name()
            assert.equal(name, 'Dapp University Marketplace')
        })
    })

    describe('products', async () => {
        let result, productCount

        before(async () => {
            // result = await marketplace.createProduct('iPhone X', '1000000000000000000')
            result = await marketplace.createProduct('iPhone X', web3.utils.toWei('1', 'Ether'), { from: seller })
            productCount = await marketplace.productCount()
        })
        it('create products', async () => {
            assert.equal(productCount, 1)
            // console.log(result.logs);
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'iPhone X', 'name is correct')
            assert.equal(event.price, '1000000000000000000', 'price is correct')
            assert.equal(event.owner, seller, 'id is correct')
            assert.equal(event.purchased, false, 'purchased is correct')

            await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;
            await marketplace.createProduct('iPhone X', 0, { from: seller }).should.be.rejected;
        })

        it('list products', async () => {
            const product = await marketplace.products(productCount)
            assert.equal(product.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(product.name, 'iPhone X', 'name is correct')
            assert.equal(product.price, '1000000000000000000', 'price is correct')
            assert.equal(product.owner, seller, 'id is correct')
            assert.equal(product.purchased, false, 'purchased is correct')
        })

        it('sell products', async () => {
            let oldSellerBalance
            oldSellerBalance = await web3.eth.getBalance(seller)
            oldSellerBalance = new web3.utils.BN(oldSellerBalance)

            result = await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') })

            const event = result .logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'iPhone X', 'name is correct')
            assert.equal(event.price, '1000000000000000000', 'price is correct')
            assert.equal(event.owner, buyer, 'id is correct')
            assert.equal(event.purchased, true, 'purchased is correct')

            let newSellerBalance
            newSellerBalance = await web3.eth.getBalance(seller)
            newSellerBalance = new web3.utils.BN(newSellerBalance)

            let price
            price = web3.utils.toWei('1', 'Ether')
            price = new web3.utils.BN(price)

            // console.log(oldSellerBalance, newSellerBalance, price);
            const expectedBalance = oldSellerBalance.add(price)

            assert.equal(newSellerBalance.toString(), expectedBalance.toString())

            result = await marketplace.purchaseProduct(99, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
            result = await marketplace.purchaseProduct(productCount, { from: buyer , value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected;
            result = await marketplace.purchaseProduct(productCount, { from: deployer , value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
            result = await marketplace.purchaseProduct(productCount, { from: buyer , value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;

        })
    })
})