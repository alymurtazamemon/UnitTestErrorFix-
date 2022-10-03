const { network, ethers } = require("hardhat")
const { developmentChains, DECIMALS, INITIAL_PRICE} = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25") //LINK premium
const GAS_PRICE_LINK = 1e9 // link per gas = 0.000000001 per gas

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]
    const chainId = network.config.chainId

    //if (!developmentChains.includes(network.name)) {
    if (chainId == 31337) {
        log("Local network detected! Deploying mocks to local network...")
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })

        await deploy("MockV3Aggregator", {
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_PRICE],
        })


        log("Mocks deployed!")
        log("______________________________________________________________")
    }
}
module.exports.tags = ["all", "mocks","dynamicsvg", "main"]
