const { assert } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Basic NFT Unit Tests", function () {
        let BasicNFT, deployer

        beforeEach(async function() {
            accounts = await ethers.getSigners()
            deployer = accounts[0]
            await deployments.fixture(["BasicNFT"])
            BasicNFT = await ethers.getContract("BasicNFT")
        })

        describe("Constructor", function(){
            it("Initilizes the NFT correctly", async function(){
                const name = await BasicNFT.name()
                console.log(`NFT name is ${name}`)
                const symbol = await BasicNFT.symbol()
                console.log(`NFT symbol is ${symbol}`)
                const tokenCounter = await BasicNFT.getTokenCounter()
                console.log(`NFT token counter is ${tokenCounter}`)

                assert.equal(name, "Doggie")
                assert.equal(symbol, "DOG")
                assert.equal(tokenCounter.toString(), "0")
            })

            describe("Mint NFT", function() {
                it("Allows users to mint an NFT, and updates appropriately", async function(){
                    const txResponse = await BasicNFT.mintNft()
                    await txResponse.wait(1)
                    const tokenURI = await BasicNFT.tokenURI(0)
                    const tokenCounter = await BasicNFT.getTokenCounter()

                    assert.equal(tokenCounter.toString(), "1")
                    assert.equal(tokenURI, await BasicNFT.TOKEN_URI())
                    console.log(`NFT minted at ${tokenURI}`)
                })
            })
        })
    })
