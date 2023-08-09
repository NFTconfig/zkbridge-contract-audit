const { expect } = require("chai");
const { ethers } = require("hardhat");
const web3Abi = require("web3-eth-abi");
const { GetProof } = require("eth-proof");
const { toBuffer } = require("eth-util-lite");
const rlp = require("rlp");
const Web3 = require("web3");
describe("ZKBridge Contract", function () {
  let zkBridgeProxChain1;
  let zkBridgeProxChain2;
  let mailer;
  let mailbox;
  let abi = {
    inputs: [
      {
        internalType: "uint16",
        name: "_chainId",
        type: "uint16",
      },
      {
        internalType: "bool",
        name: "_isL2",
        type: "bool",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  };

  async function getProof(txhash, blockHash) {
    const proof = new GetProof("http://127.0.0.1:8545");
    const web3 = new Web3("http://127.0.0.1:8545");

    // 获取区块信息
    const block = await web3.eth.getBlock(blockHash);
    // 获取交易的 MPT 证明
    const result = await proof.receiptProof(txhash);
    const a = [
      toBuffer(block.receiptsRoot),
      toBuffer(result.txIndex),
      result.receiptProof,
    ];

    return "0x" + rlp.encode(a).toString("hex");
  }

  beforeEach(async function () {
    const MptVerifier = await ethers.getContractFactory("MptVerifier");
    const mptVerifier = await MptVerifier.deploy();
    await mptVerifier.deployed();

    const BlockUpdater = await ethers.getContractFactory("BlockUpdater");
    const blockUpdater = await BlockUpdater.deploy();
    await blockUpdater.deployed();

    const ZkBridgeAdmin = await ethers.getContractFactory("ZkBridgeAdmin");
    const zkBridgeAdmin = await ZkBridgeAdmin.deploy();
    await zkBridgeAdmin.deployed();

    const ZKBridgeChain1 = await ethers.getContractFactory("ZKBridge");
    const zkBridgeChain1 = await ZKBridgeChain1.deploy();
    await zkBridgeChain1.deployed();
    let initDataChain1 = web3Abi.encodeFunctionCall(abi, [1, false]);
    const OptimizedTransparentUpgradeableProxyChain1 =
      await ethers.getContractFactory("OptimizedTransparentUpgradeableProxy");
    zkBridgeProxChain1 =
      await OptimizedTransparentUpgradeableProxyChain1.deploy(
        zkBridgeChain1.address,
        zkBridgeAdmin.address,
        initDataChain1
      );
    await zkBridgeProxChain1.deployed();

    const ZKBridgeChain2 = await ethers.getContractFactory("ZKBridge");
    const zkBridgeChain2 = await ZKBridgeChain2.deploy();
    await zkBridgeChain2.deployed();
    let initDataChain2 = web3Abi.encodeFunctionCall(abi, [2, false]);
    const OptimizedTransparentUpgradeableProxyChain2 =
      await ethers.getContractFactory("OptimizedTransparentUpgradeableProxy");
    zkBridgeProxChain2 =
      await OptimizedTransparentUpgradeableProxyChain2.deploy(
        zkBridgeChain2.address,
        zkBridgeAdmin.address,
        initDataChain2
      );
    await zkBridgeProxChain2.deployed();
    zkBridgeProxChain1 = await ethers.getContractAt(
      "ZKBridge",
      zkBridgeProxChain1.address
    );
    await zkBridgeProxChain1.setMptVerifier(2, mptVerifier.address);
    await zkBridgeProxChain1.setBlockUpdater(2, blockUpdater.address);
    await zkBridgeProxChain1.setTrustedRemoteAddress(
      2,
      zkBridgeProxChain2.address
    );

    zkBridgeProxChain2 = await ethers.getContractAt(
      "ZKBridge",
      zkBridgeProxChain2.address
    );
    await zkBridgeProxChain2.setMptVerifier(1, mptVerifier.address);
    await zkBridgeProxChain2.setBlockUpdater(1, blockUpdater.address);
    await zkBridgeProxChain2.setTrustedRemoteAddress(
      1,
      zkBridgeProxChain1.address
    );

    const Mailer = await ethers.getContractFactory("Mailer");
    mailer = await Mailer.deploy(zkBridgeProxChain1.address);
    await mailer.deployed();

    const Mailbox = await ethers.getContractFactory("Mailbox");
    mailbox = await Mailbox.deploy(zkBridgeProxChain2.address);
    await mailbox.deployed();
  });

  it("Should initialize correctly", async function () {
    const chainId = await zkBridgeProxChain1.chainId();
    const isL2 = await zkBridgeProxChain1.isL2();

    expect(chainId).to.equal(1);
    expect(isL2).to.equal(false);

    const chainId2 = await zkBridgeProxChain2.chainId();
    const isL22 = await zkBridgeProxChain2.isL2();

    expect(chainId2).to.equal(2);
    expect(isL22).to.equal(false);
  });

  it("Should send a message", async function () {
    let zkBridge = zkBridgeProxChain1;
    const sender = await ethers.getSigner(1);
    const recipient = sender.address;
    const payload = "0x12345678";

    await zkBridge
      .connect(sender)
      .send(2, recipient, payload, { value: ethers.utils.parseEther("1.0") });
    const data = ethers.utils.defaultAbiCoder.encode(
      ["address", "uint256", "address"],
      [recipient, 2, recipient]
    );
    let hash = ethers.utils.keccak256(data);
    const newNonce = await zkBridge.targetNonce(hash);
    expect(newNonce).to.equal(1);
  });

  it("Should sendFromL2 a message", async function () {
    let zkBridge = zkBridgeProxChain1;
    const sender = await ethers.getSigner(0);
    const recipient = sender.address;
    const payload = "0x12345678";

    await zkBridge.connect(sender).setL2MessageReceive(1, recipient);
    await zkBridge.connect(sender).sendFromL2(1, 2, recipient, payload);
    const data = ethers.utils.defaultAbiCoder.encode(
      ["address", "uint256", "address"],
      [recipient, 2, recipient]
    );
    let hash = ethers.utils.keccak256(data);
    const newNonce = await zkBridge.targetNonce(hash);
    expect(newNonce).to.equal(1);
  });

  it("Should validateTransactionProof", async function () {
    const sender = await ethers.getSigner(0);
    let message = "hello world";
    let tx = await mailer
      .connect(sender)
      .sendMessage(2, mailbox.address,sender.address,message);
    let receipt = await tx.wait();
    let transactionHash = receipt.transactionHash;
    let blockHash = receipt.blockHash;
    let logIndex;
    for (const log of receipt.logs) {
      if (
        log.topics.includes(
          "0xb8abfd5c33667c7440a4fc1153ae39a24833dbe44f7eb19cbe5cd5f2583e4940"
        )
      ) {
        logIndex = receipt.logs.indexOf(log);
      }
    }
    let proof = await getProof(transactionHash, blockHash);
    let validateTransactionProofTx = await zkBridgeProxChain2
      .connect(sender)
      .validateTransactionProof(1, blockHash, logIndex, proof, {
        gasLimit: 3000000,
      });
    await validateTransactionProofTx.wait();

    const reciveMessage =  await mailbox.messages(sender.address,0);
    expect(reciveMessage[1]).to.equal(message);
  });
});
