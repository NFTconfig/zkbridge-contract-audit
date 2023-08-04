import {task, types} from 'hardhat/config'
import web3Abi from 'web3-eth-abi';
import fs from 'fs'
import util from 'util'
import path from 'path'

import {
    BlockUpdater,
    BlockUpdater__factory,
    Setup,
    Setup__factory,
    ZKBridge,
    ZKBridge__factory,
    ZKBridgeEntrypoint,
    ZKBridgeEntrypoint__factory,
    MptVerifier, MptVerifier__factory
} from "../build/types"
import {PromiseOrValue} from "../build/types/common";
import {BigNumberish, BytesLike} from "ethers";

let prefix = "0x000000000000000000000000"
const writeFile = util.promisify(fs.writeFile);

task('zkBridge:deploy', 'deploy ZKBridgeEntrypoint')
    .addOptionalParam('lock', 'lock time', 0, types.int)
    .addOptionalParam('id', 'chain id', 19, types.int)
    .addOptionalParam('chain', 'network name', "eth_prod")
    .setAction(async function (args, {ethers}) {
        console.log(`[depoly MptVerifier] start`)
        const MptVerifier__factory = <MptVerifier__factory>await ethers.getContractFactory("MptVerifier")
        let MptVerifier = <MptVerifier>await MptVerifier__factory.deploy()
        await MptVerifier.deployed()
        console.log(`MptVerifier:${MptVerifier.address}`)
        console.log(`npx hardhat verify --contract contracts/proof/MptVerifier.sol:MptVerifier --network ${args.chain} ${MptVerifier.address}`)
        //
        console.log(`[depoly BlockUpdater] start`)
        const BlockUpdater__factory = <BlockUpdater__factory>await ethers.getContractFactory("BlockUpdater")
        let BlockUpdater = <BlockUpdater>await BlockUpdater__factory.deploy()
        await BlockUpdater.deployed()
        console.log(`BlockUpdater:${BlockUpdater.address}`)
        //
        console.log(`[depoly ZKBridge] start`)
        const ZKBridge__factory = <ZKBridge__factory>await ethers.getContractFactory("ZKBridge")
        let ZKBridge = <ZKBridge>await ZKBridge__factory.deploy()
        await ZKBridge.deployed()
        console.log(`ZKBridge:${ZKBridge.address}`)
        console.log(`npx hardhat verify --contract contracts/ZKBridge.sol:ZKBridge --network ${args.chain} ${ZKBridge.address}`)
        //
        console.log(`\n[depoly Setup] start`)
        const setup_factory = <Setup__factory>await ethers.getContractFactory("Setup")
        const Setup = <Setup>await setup_factory.deploy()
        await Setup.deployed()
        console.log(`Setup:${Setup.address}`)
        console.log(`npx hardhat verify --contract contracts/Setup.sol:Setup --network ${args.chain} ${Setup.address}`)

        const signers = await ethers.getSigners()
        const signer_address = await signers[0].getAddress()

        console.log(`\n[depoly ZKBridgeEntrypoint] start`)
        // @ts-ignore
        let initData = web3Abi.encodeFunctionCall(ZKBridgeSetupAbi, [ZKBridge.address, signer_address, args.lock, args.id, true]);
        console.log(`initData:${initData}`)

        const ZKBridgeEntrypoint__factory = <ZKBridgeEntrypoint__factory>await ethers.getContractFactory("ZKBridgeEntrypoint")
        const ZKBridgeEntrypoint = <ZKBridgeEntrypoint>await ZKBridgeEntrypoint__factory.deploy(Setup.address, initData)
        await ZKBridgeEntrypoint.deployed()

        let exports = [Setup.address, initData]
        const argumentsPath = path.resolve(__dirname, `../arguments.js`);
        await writeFile(argumentsPath, "module.exports = " + JSON.stringify(exports));

        console.log(`ZKBridgeEntrypoint:${ZKBridgeEntrypoint.address}`)
        console.log(`npx hardhat verify --contract contracts/ZKBridgeEntrypoint.sol:ZKBridgeEntrypoint --network ${args.chain} ${ZKBridgeEntrypoint.address} --constructor-args arguments.js`)
        console.log(`--------------------------------------------`)
    })

let ZKBridgeSetupAbi = {
    "inputs": [
        {
            "internalType": "address",
            "name": "implementation",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "owner",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "lockTime",
            "type": "uint256"
        },
        {
            "internalType": "uint16",
            "name": "chainId",
            "type": "uint16"
        },
        {
            "internalType": "bool",
            "name": "isL2",
            "type": "bool"
        }
    ],
    "name": "setup",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}
