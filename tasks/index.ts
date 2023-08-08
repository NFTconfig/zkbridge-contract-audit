import {task, types} from 'hardhat/config'
import web3Abi from 'web3-eth-abi';
import fs from 'fs'
import util from 'util'

import {
    OptimizedTransparentUpgradeableProxy,
    OptimizedTransparentUpgradeableProxy__factory,
    ZKBridge,
    ZKBridge__factory
} from "../build/types"
import path from "path";

const writeFile = util.promisify(fs.writeFile);
task('zkBridge:deploy', 'deploy zkBridge')
    .addOptionalParam('lock', 'lock time', 0, types.int)
    .addOptionalParam('id', 'chain id', 1, types.int)
    .addOptionalParam('admin', 'admin address', "0x71Ca974F27759C83920842D6b2747e4896e73f4A")
    .addOptionalParam('isl2', 'is L2', "false")
    .addOptionalParam('chain', 'network name', "bsc_test")
    .setAction(async function (args, {ethers}) {
        console.log(`[depoly ZKBridge] start`)
        const ZKBridge__factory = <ZKBridge__factory>await ethers.getContractFactory("ZKBridge")
        let ZKBridge = <ZKBridge>await ZKBridge__factory.deploy()
        await ZKBridge.deployed()
        console.log(`ZKBridge:${ZKBridge.address}`)
        console.log(`npx hardhat verify --contract contracts/ZKBridge.sol:ZKBridge --network ${args.chain} ${ZKBridge.address}`)
        //@ts-ignore
        let initData = web3Abi.encodeFunctionCall(abi, [args.id, args.isl2]);
        console.log(`initData:${initData}`)

        let ZKBridgeProxy__factory = <OptimizedTransparentUpgradeableProxy__factory>await ethers.getContractFactory("OptimizedTransparentUpgradeableProxy")
        let ZKBridgeProxy = <OptimizedTransparentUpgradeableProxy>await ZKBridgeProxy__factory.deploy(ZKBridge.address, args.admin, initData)
        await ZKBridgeProxy.deployed()
        console.log(`ZKBridgeProxy:${ZKBridgeProxy.address}`)
        let exports = [ZKBridge.address, args.admin, initData]
        const argumentsPath = path.resolve(__dirname, `../arguments.js`);
        await writeFile(argumentsPath, "module.exports = " + JSON.stringify(exports));
        console.log(`npx hardhat verify ${ZKBridgeProxy.address} --network ${args.chain}  --constructor-args arguments.js --contract contracts/OptimizedTransparentUpgradeableProxy.sol:OptimizedTransparentUpgradeableProxy`)
        console.log(`-------------------------------------------------------------------`)
        let contract = <ZKBridge>await ethers.getContractAt("ZKBridge", ZKBridgeProxy.address)
        console.log(await contract.isL2())
    })

let abi = {
    "inputs": [
        {
            "internalType": "uint16",
            "name": "_chainId",
            "type": "uint16"
        },
        {
            "internalType": "bool",
            "name": "_isL2",
            "type": "bool"
        }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}