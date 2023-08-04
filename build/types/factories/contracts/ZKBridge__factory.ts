/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { ZKBridge, ZKBridgeInterface } from "../../contracts/ZKBridge";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldContract",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newContract",
        type: "address",
      },
    ],
    name: "ContractUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint16",
        name: "srcChainId",
        type: "uint16",
      },
      {
        indexed: true,
        internalType: "uint64",
        name: "sequence",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "address",
        name: "dstAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "payload",
        type: "bytes",
      },
    ],
    name: "ExecutedMessage",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint16",
        name: "dstChainId",
        type: "uint16",
      },
      {
        indexed: true,
        internalType: "uint64",
        name: "sequence",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "address",
        name: "dstAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "payload",
        type: "bytes",
      },
    ],
    name: "MessagePublished",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "pendingImplementation",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "NewPendingImplementation",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "MESSAGE_TOPIC",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MIN_LOCK_TIME",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "chainId",
        type: "uint16",
      },
    ],
    name: "blockUpdater",
    outputs: [
      {
        internalType: "contract IBlockUpdater",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "chainId",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claimFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "confirmContractUpgrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "impl",
        type: "address",
      },
    ],
    name: "isInitialized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isL2",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
    ],
    name: "isTransferCompleted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "chainId",
        type: "uint16",
      },
    ],
    name: "l2MessageReceive",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "l2MessageSend",
    outputs: [
      {
        internalType: "contract IL2MessageSend",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lockTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "chainId",
        type: "uint16",
      },
    ],
    name: "mptVerifier",
    outputs: [
      {
        internalType: "contract IMptVerifier",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
    ],
    name: "nextSequence",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingImplementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "chainId",
        type: "uint16",
      },
      {
        internalType: "bytes32",
        name: "bridgeContract",
        type: "bytes32",
      },
    ],
    name: "registerChain",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "dstChainId",
        type: "uint16",
      },
      {
        internalType: "address",
        name: "dstAddress",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "payload",
        type: "bytes",
      },
    ],
    name: "send",
    outputs: [
      {
        internalType: "uint64",
        name: "sequence",
        type: "uint64",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "srcChainId",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "dstChainId",
        type: "uint16",
      },
      {
        internalType: "address",
        name: "dstAddress",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "payload",
        type: "bytes",
      },
    ],
    name: "sendFromL2",
    outputs: [
      {
        internalType: "uint64",
        name: "sequence",
        type: "uint64",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "chainId",
        type: "uint16",
      },
      {
        internalType: "address",
        name: "blockUpdater",
        type: "address",
      },
    ],
    name: "setBlockUpdater",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "isL2",
        type: "bool",
      },
    ],
    name: "setL2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "chainId",
        type: "uint16",
      },
      {
        internalType: "address",
        name: "l2MessageReceive",
        type: "address",
      },
    ],
    name: "setL2MessageReceive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "l2MessageSend",
        type: "address",
      },
    ],
    name: "setL2MessageSend",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "lockTime",
        type: "uint256",
      },
    ],
    name: "setLockTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "chainId",
        type: "uint16",
      },
      {
        internalType: "address",
        name: "mptVerifier",
        type: "address",
      },
    ],
    name: "setMptVerifier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "submitContractUpgrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "toUpdateTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "srcChainId",
        type: "uint16",
      },
      {
        internalType: "address",
        name: "srcAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "dstAddress",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "sequence",
        type: "uint64",
      },
      {
        internalType: "bytes",
        name: "payload",
        type: "bytes",
      },
    ],
    name: "validateTransactionFromL2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "srcChainId",
        type: "uint16",
      },
      {
        internalType: "bytes32",
        name: "srcBlockHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "logIndex",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "mptProof",
        type: "bytes",
      },
    ],
    name: "validateTransactionProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "chainId",
        type: "uint16",
      },
    ],
    name: "zkBridgeContracts",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506131d1806100206000396000f3fe6080604052600436106101dc5760003560e01c806376348f7111610102578063ae04d45d11610095578063d294f09311610064578063d294f09314610664578063d60b347f14610679578063d98465c3146106b2578063fe2db7d0146106d257610243565b8063ae04d45d146105e6578063b1d995dd14610606578063bd51f42e14610619578063d1dc83c21461064f57610243565b80638da5cb5b116100d15780638da5cb5b146105605780639a8a05921461057e5780639f0a22a6146105a1578063aa4efa5b146105b657610243565b806376348f71146104e05780637cf5744f1461050b5780638129fc1c1461052b578063813d31c91461054057610243565b80633ff032071161017a5780635af466aa116101495780635af466aa1461041457806365bb3ea71461044c57806366798c2c1461046c5780636b83252a146104a657610243565b80633ff032071461039d57806348a29593146103b45780634f64ca19146103d457806350520509146103f457610243565b806336ae03d8116101b657806336ae03d8146102f1578063396f7b231461032b5780633a552757146103495780633fe3da361461036957610243565b80630232c006146102795780630d668087146102b057806324ee48e9146102cf57610243565b366102435760405162461bcd60e51b815260206004820152602c60248201527f746865205a6b42726964676520636f6e747261637420646f6573206e6f74206160448201526b63636570742061737365747360a01b60648201526084015b60405180910390fd5b60405162461bcd60e51b815260206004820152600b60248201526a1d5b9cdd5c1c1bdc9d195960aa1b604482015260640161023a565b34801561028557600080fd5b50600b546001600160a01b03165b6040516001600160a01b0390911681526020015b60405180910390f35b3480156102bc57600080fd5b506004545b6040519081526020016102a7565b3480156102db57600080fd5b506102ef6102ea3660046127d5565b610703565b005b3480156102fd57600080fd5b5061029361030c366004612890565b61ffff166000908152600c60205260409020546001600160a01b031690565b34801561033757600080fd5b506002546001600160a01b0316610293565b34801561035557600080fd5b506102ef6103643660046128ad565b610995565b34801561037557600080fd5b506102c17fb8abfd5c33667c7440a4fc1153ae39a24833dbe44f7eb19cbe5cd5f2583e494081565b3480156103a957600080fd5b506102c16201518081565b3480156103c057600080fd5b506102ef6103cf3660046128ad565b610aa2565b3480156103e057600080fd5b506102ef6103ef36600461298d565b610afc565b34801561040057600080fd5b506102ef61040f3660046129fd565b611159565b34801561042057600080fd5b5061043461042f366004612a1a565b6111ac565b6040516001600160401b0390911681526020016102a7565b34801561045857600080fd5b506102ef610467366004612a76565b6112b2565b34801561047857600080fd5b50610293610487366004612890565b61ffff166000908152600a60205260409020546001600160a01b031690565b3480156104b257600080fd5b506102936104c1366004612890565b61ffff166000908152600960205260409020546001600160a01b031690565b3480156104ec57600080fd5b50600b54600160a01b900460ff165b60405190151581526020016102a7565b34801561051757600080fd5b506102ef610526366004612aa2565b611303565b34801561053757600080fd5b506102ef61136c565b34801561054c57600080fd5b506102ef61055b366004612aa2565b61142e565b34801561056c57600080fd5b506001546001600160a01b0316610293565b34801561058a57600080fd5b5060005460405161ffff90911681526020016102a7565b3480156105ad57600080fd5b506003546102c1565b3480156105c257600080fd5b506104fb6105d1366004612adb565b60009081526008602052604090205460ff1690565b3480156105f257600080fd5b506102ef610601366004612adb565b611497565b610434610614366004612af4565b61152c565b34801561062557600080fd5b50610434610634366004612adb565b6000908152600560205260409020546001600160401b031690565b34801561065b57600080fd5b506102ef61172d565b34801561067057600080fd5b506102ef611961565b34801561068557600080fd5b506104fb6106943660046128ad565b6001600160a01b031660009081526007602052604090205460ff1690565b3480156106be57600080fd5b506102ef6106cd366004612aa2565b6119d3565b3480156106de57600080fd5b506102c16106ed366004612890565b61ffff1660009081526006602052604090205490565b61ffff86166000908152600c60205260409020546001600160a01b0316331461073e5760405162461bcd60e51b815260040161023a90612b55565b60008061078084848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611a3c92505050565b91509150806107c75760405162461bcd60e51b81526020600482015260136024820152722ab739bab83837b93a32b2103b32b939b4b7b760691b604482015260640161023a565b815161ffff8981169116146108135760405162461bcd60e51b8152602060048201526012602482015271125b9d985b1a59081cdc98d0da185a5b925960721b604482015260640161023a565b60005461ffff1661ffff16826020015161ffff16146108445760405162461bcd60e51b815260040161023a90612b97565b6040805161ffff8a1660208201526001600160a01b038916918101919091526001600160401b03861660608201526000906080016040516020818303038152906040528051906020012090506108a98160009081526008602052604090205460ff1690565b156108c65760405162461bcd60e51b815260040161023a90612bce565b6108cf81611b82565b60a08301516040516316f4ca9560e11b81526001600160a01b03891691632de9952a91610904918d918d918c91600401612c61565b600060405180830381600087803b15801561091e57600080fd5b505af1158015610932573d6000803e3d6000fd5b50505050856001600160401b03168961ffff16896001600160a01b03167f4a008ac830958ba6fe8a6e667e2ab53a530eb6cdf93e55b27fc42d7a54cf25b78a898960405161098293929190612ca8565b60405180910390a4505050505050505050565b336109a86001546001600160a01b031690565b6001600160a01b0316146109ce5760405162461bcd60e51b815260040161023a90612ce8565b6001600160a01b038116610a245760405162461bcd60e51b815260206004820152601b60248201527f436865636b2070656e64696e67496d706c656d656e746174696f6e0000000000604482015260640161023a565b6000610a386002546001600160a01b031690565b9050610a4382611b9d565b610a5e610a4f60045490565b610a599042612d33565b600355565b816001600160a01b0316816001600160a01b03167fe945ccee5d701fc83f9b8aa8ca94ea4219ec1fcbd4f4cab4f0ea57c5c3e1d81560405160405180910390a35050565b33610ab56001546001600160a01b031690565b6001600160a01b031614610adb5760405162461bcd60e51b815260040161023a90612ce8565b600b80546001600160a01b0319166001600160a01b03831617905550565b50565b61ffff8416600090815260096020908152604080832054600a909252909120546001600160a01b03918216911681610b6f5760405162461bcd60e51b8152602060048201526016602482015275135c1d15995c9a599a595c881a5cc81b9bdd081cd95d60521b604482015260640161023a565b6001600160a01b038116610bc55760405162461bcd60e51b815260206004820152601860248201527f426c6f636b2055706461746572206973206e6f74207365740000000000000000604482015260640161023a565b60405163057d916d60e11b81526000906001600160a01b03841690630afb22da90610bf4908790600401612d4b565b600060405180830381865afa158015610c11573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610c399190810190612da3565b90508060200151600114610c8f5760405162461bcd60e51b815260206004820181905260248201527f536f7572636520436861696e205472616e73616374696f6e204661696c757265604482015260640161023a565b8051604051636e1ac47560e11b81526001600160a01b0384169163dc3588ea91610cc6918a91600401918252602082015260400190565b602060405180830381865afa158015610ce3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d079190612e3b565b610d535760405162461bcd60e51b815260206004820152601760248201527f426c6f636b20486561646572206973206e6f7420736574000000000000000000604482015260640161023a565b6000610d63826040015187611bbf565b9050610d7f8861ffff1660009081526006602052604090205490565b816080015114610dd15760405162461bcd60e51b815260206004820152601760248201527f496e76616c696420736f75726365205a4b427269646765000000000000000000604482015260640161023a565b600054815161ffff908116911614610dfb5760405162461bcd60e51b815260040161023a90612b97565b60008882606001518360200151604051602001610e3a9392919061ffff93909316835260208301919091526001600160401b0316604082015260600190565b604051602081830303815290604052805190602001209050610e6b8160009081526008602052604090205460ff1690565b15610e885760405162461bcd60e51b815260040161023a90612bce565b610e9181611b82565b81602001516001600160401b03168961ffff16610eb18460600151611e1b565b6001600160a01b03167f4a008ac830958ba6fe8a6e667e2ab53a530eb6cdf93e55b27fc42d7a54cf25b785604001518660a00151604051610ef3929190612e58565b60405180910390a4600080610f0b8460a00151611a3c565b9150915080156110cf578a61ffff16826000015161ffff16146110535760005461ffff1661ffff16826020015161ffff1614610f595760405162461bcd60e51b815260040161023a90612b97565b8151604080840151608080860151835161ffff90951660208601526001600160a01b03909216928401929092526001600160401b0316606083015201604051602081830303815290604052805190602001209250610fc68360009081526008602052604090205460ff1690565b15610fe35760405162461bcd60e51b815260040161023a90612bce565b610fec83611b82565b81608001516001600160401b0316826000015161ffff1683604001516001600160a01b03167f4a008ac830958ba6fe8a6e667e2ab53a530eb6cdf93e55b27fc42d7a54cf25b785606001518660a0015160405161104a929190612e58565b60405180910390a45b60608201518251604080850151608086015160a087015192516316f4ca9560e11b81526001600160a01b0390951694632de9952a946110989490939291600401612c61565b600060405180830381600087803b1580156110b257600080fd5b505af11580156110c6573d6000803e3d6000fd5b5050505061114c565b83604001516001600160a01b0316632de9952a8c6110f08760600151611e1b565b87602001518860a001516040518563ffffffff1660e01b81526004016111199493929190612c61565b600060405180830381600087803b15801561113357600080fd5b505af1158015611147573d6000803e3d6000fd5b505050505b5050505050505050505050565b3361116c6001546001600160a01b031690565b6001600160a01b0316146111925760405162461bcd60e51b815260040161023a90612ce8565b600b805460ff60a01b1916600160a01b8315150217905550565b61ffff84166000908152600c60205260408120546001600160a01b031633146111e75760405162461bcd60e51b815260040161023a90612b55565b60005461ffff1661ffff168461ffff16036112405760405162461bcd60e51b815260206004820152601960248201527821b0b73737ba1039b2b732103a379039b0b6b29031b430b4b760391b604482015260640161023a565b61125661125060005461ffff1690565b33611e6f565b9050806001600160401b03168461ffff16336001600160a01b03167fb8abfd5c33667c7440a4fc1153ae39a24833dbe44f7eb19cbe5cd5f2583e494086866040516112a2929190612e58565b60405180910390a4949350505050565b336112c56001546001600160a01b031690565b6001600160a01b0316146112eb5760405162461bcd60e51b815260040161023a90612ce8565b61ffff91909116600090815260066020526040902055565b336113166001546001600160a01b031690565b6001600160a01b03161461133c5760405162461bcd60e51b815260040161023a90612ce8565b61ffff8216600090815260096020526040902080546001600160a01b0319166001600160a01b0383161790555050565b600061139f7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b90506113c3816001600160a01b031660009081526007602052604090205460ff1690565b156114065760405162461bcd60e51b8152602060048201526013602482015272185b1c9958591e481a5b9a5d1a585b1a5e9959606a1b604482015260640161023a565b610af9816001600160a01b03166000908152600760205260409020805460ff19166001179055565b336114416001546001600160a01b031690565b6001600160a01b0316146114675760405162461bcd60e51b815260040161023a90612ce8565b61ffff82166000908152600a6020526040902080546001600160a01b0319166001600160a01b0383161790555050565b336114aa6001546001600160a01b031690565b6001600160a01b0316146114d05760405162461bcd60e51b815260040161023a90612ce8565b620151808110156115235760405162461bcd60e51b815260206004820152601b60248201527f496e636f7272656374206c6f636b54696d652073657474696e67730000000000604482015260640161023a565b610af981600455565b6000805461ffff1661ffff168461ffff16036115865760405162461bcd60e51b815260206004820152601960248201527821b0b73737ba1039b2b732103a379039b0b6b29031b430b4b760391b604482015260640161023a565b61159661125060005461ffff1690565b9050722d25a13934b233b2903b19103b32b939b4b7b760691b6115bc60005461ffff1690565b85338685876040516020016115d79796959493929190612e7c565b60405160208183030381529060405291506115fc600b5460ff600160a01b9091041690565b156116d457600b546001600160a01b031663ccbf1a2c816001600160a01b031663ced72f876040518163ffffffff1660e01b8152600401602060405180830381865afa158015611650573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116749190612efe565b60005461ffff1633888887896040518863ffffffff1660e01b81526004016116a196959493929190612f17565b6000604051808303818588803b1580156116ba57600080fd5b505af11580156116ce573d6000803e3d6000fd5b50505050505b806001600160401b03168461ffff16336001600160a01b03167fb8abfd5c33667c7440a4fc1153ae39a24833dbe44f7eb19cbe5cd5f2583e4940868660405161171e929190612e58565b60405180910390a49392505050565b336117406001546001600160a01b031690565b6001600160a01b0316146117665760405162461bcd60e51b815260040161023a90612ce8565b600061177a6002546001600160a01b031690565b6001600160a01b0316036117d05760405162461bcd60e51b815260206004820152601b60248201527f436865636b2070656e64696e67496d706c656d656e746174696f6e0000000000604482015260640161023a565b6003544210156118145760405162461bcd60e51b815260206004820152600f60248201526e29ba34b636103637b1b5b2b21034b760891b604482015260640161023a565b60006118477f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b9050600061185d6002546001600160a01b031690565b90506118696000611b9d565b61187281611f14565b60408051600481526024810182526020810180516001600160e01b031663204a7f0760e21b179052905160009182916001600160a01b038516916118b591612f71565b600060405180830381855af49150503d80600081146118f0576040519150601f19603f3d011682016040523d82523d6000602084013e6118f5565b606091505b509150915081819061191a5760405162461bcd60e51b815260040161023a9190612d4b565b50826001600160a01b0316846001600160a01b03167f2e4cc16c100f0b55e2df82ab0b1a7e294aa9cbd01b48fbaf622683fbc0507a4960405160405180910390a350505050565b336119746001546001600160a01b031690565b6001600160a01b03161461199a5760405162461bcd60e51b815260040161023a90612ce8565b6001546040516001600160a01b03909116904780156108fc02916000818181858888f19350505050158015610af9573d6000803e3d6000fd5b336119e66001546001600160a01b031690565b6001600160a01b031614611a0c5760405162461bcd60e51b815260040161023a90612ce8565b61ffff82166000908152600c6020526040902080546001600160a01b0319166001600160a01b0383161790555050565b6040805160c08101825260008082526020820181905291810182905260608082018390526080820183905260a0820152908080611a798582611f54565b9050722d25a13934b233b2903b19103b32b939b4b7b760691b8114611a9f575050915091565b611aaa602083612d33565b9150611ab68583611fb8565b61ffff168452611ac7600283612d33565b9150611ad38583611fb8565b61ffff166020850152611ae7600283612d33565b9150611af38583612015565b6001600160a01b03166040850152611b0c601483612d33565b9150611b188583612015565b6001600160a01b03166060850152611b31601483612d33565b9150611b3d858361207a565b6001600160401b03166080850152611b56600883612d33565b9150611b7182838751611b699190612f8d565b8791906120d7565b60a085015250919360019350915050565b6000908152600860205260409020805460ff19166001179055565b600280546001600160a01b0319166001600160a01b0392909216919091179055565b6040805160c0810182526000808252602080830182905282840182905260608084018390526080840183905260a0840152835180850185528281528101829052835180850190945285518452858101908401529091611c22906121e4565b6121e4565b90508215611c8c57611c89611c1d611c5c83611c3f876002612d33565b81518110611c4f57611c4f612fa4565b60200260200101516122f9565b60408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b90505b6000611caa611c1d611c5c84600181518110611c4f57611c4f612fa4565b90506000611cd182600081518110611cc457611cc4612fa4565b6020026020010151612370565b806020019051810190611ce49190612efe565b90507f475402a3cc99838bbf5b03eeac51c65db7cc241bb0814e6341a32a0da7c1b6c08101611e1257611d3083600081518110611d2357611d23612fa4565b60200260200101516123e4565b60808501528151611d4e9083906001908110611cc457611cc4612fa4565b806020019051810190611d619190612efe565b60608501528151611d7f9083906002908110611cc457611cc4612fa4565b806020019051810190611d929190612fba565b61ffff1684528151611db19083906003908110611cc457611cc4612fa4565b806020019051810190611dc49190612fd7565b6001600160401b031660208501528251611deb9084906002908110611cc457611cc4612fa4565b806020019051810190611dfe9190612ff4565b60a08601526001600160a01b031660408501525b50505092915050565b60006001600160a01b0319821615611e6b5760405162461bcd60e51b8152602060048201526013602482015272696e76616c69642045564d206164647265737360681b604482015260640161023a565b5090565b6040805161ffff841660208201526001600160a01b038316918101919091526000908190606001604051602081830303815290604052805190602001209050611ecd816000908152600560205260409020546001600160401b031690565b9150611f0d81611ede846001613044565b600091825260056020526040909120805467ffffffffffffffff19166001600160401b03909216919091179055565b5092915050565b611f1d816123ef565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b6000611f61826020612d33565b83511015611fa95760405162461bcd60e51b8152602060048201526015602482015274746f427974657333325f6f75744f66426f756e647360581b604482015260640161023a565b50818101602001515b92915050565b6000611fc5826002612d33565b8351101561200c5760405162461bcd60e51b8152602060048201526014602482015273746f55696e7431365f6f75744f66426f756e647360601b604482015260640161023a565b50016002015190565b6000612022826014612d33565b8351101561206a5760405162461bcd60e51b8152602060048201526015602482015274746f416464726573735f6f75744f66426f756e647360581b604482015260640161023a565b500160200151600160601b900490565b6000612087826008612d33565b835110156120ce5760405162461bcd60e51b8152602060048201526014602482015273746f55696e7436345f6f75744f66426f756e647360601b604482015260640161023a565b50016008015190565b6060816120e581601f612d33565b10156121245760405162461bcd60e51b815260206004820152600e60248201526d736c6963655f6f766572666c6f7760901b604482015260640161023a565b61212e8284612d33565b845110156121725760405162461bcd60e51b8152602060048201526011602482015270736c6963655f6f75744f66426f756e647360781b604482015260640161023a565b60608215801561219157604051915060008252602082016040526121db565b6040519150601f8416801560200281840101858101878315602002848b0101015b818310156121ca5780518352602092830192016121b2565b5050858452601f01601f1916604052505b50949350505050565b60606121ef8261249d565b6121f857600080fd5b6000612203836124d8565b90506000816001600160401b0381111561221f5761221f6128ca565b60405190808252806020026020018201604052801561226457816020015b604080518082019091526000808252602082015281526020019060019003908161223d5790505b5090506000612276856020015161255d565b85602001516122859190612d33565b90506000805b848110156122ee5761229c836125df565b91506040518060400160405280838152602001848152508482815181106122c5576122c5612fa4565b60209081029190910101526122da8284612d33565b9250806122e68161306f565b91505061228b565b509195945050505050565b6060600082600001516001600160401b03811115612319576123196128ca565b6040519080825280601f01601f191660200182016040528015612343576020820181803683370190505b50905080516000036123555792915050565b6000816020019050611f0d8460200151828660000151612683565b805160609061237e57600080fd5b60008061238a84612706565b915091506000816001600160401b038111156123a8576123a86128ca565b6040519080825280601f01601f1916602001820160405280156123d2576020820181803683370190505b509050602081016121db848285612683565b6000611fb28261274d565b6001600160a01b0381163b61245c5760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b606482015260840161023a565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80546001600160a01b0319166001600160a01b0392909216919091179055565b805160009081036124b057506000919050565b6020820151805160001a9060c08210156124ce575060009392505050565b5060019392505050565b805160009081036124eb57506000919050565b6000806124fb846020015161255d565b846020015161250a9190612d33565b90506000846000015185602001516125229190612d33565b90505b8082101561255457612536826125df565b6125409083612d33565b91508261254c8161306f565b935050612525565b50909392505050565b8051600090811a60808110156125765750600092915050565b60b8811080612591575060c08110801590612591575060f881105b1561259f5750600192915050565b60c08110156125d3576125b4600160b8613088565b6125c19060ff1682612f8d565b6125cc906001612d33565b9392505050565b6125b4600160f8613088565b80516000908190811a60808110156125fa5760019150611f0d565b60b88110156126205761260e608082612f8d565b612619906001612d33565b9150611f0d565b60c081101561264d5760b78103600185019450806020036101000a85510460018201810193505050611f0d565b60f88110156126615761260e60c082612f8d565b60019390930151602084900360f7016101000a900490920160f5190192915050565b8060000361269057505050565b602081106126c857825182526126a7602084612d33565b92506126b4602083612d33565b91506126c1602082612f8d565b9050612690565b801561270157600060016126dd836020612f8d565b6126e99061010061318f565b6126f39190612f8d565b845184518216911916178352505b505050565b6000806000612718846020015161255d565b9050600081856020015161272c9190612d33565b905060008286600001516127409190612f8d565b9196919550909350505050565b80516000901580159061276257508151602110155b61276b57600080fd5b60008061277784612706565b8151919350915060208210156127935760208290036101000a90045b949350505050565b61ffff81168114610af957600080fd5b6001600160a01b0381168114610af957600080fd5b6001600160401b0381168114610af957600080fd5b60008060008060008060a087890312156127ee57600080fd5b86356127f98161279b565b95506020870135612809816127ab565b94506040870135612819816127ab565b93506060870135612829816127c0565b925060808701356001600160401b038082111561284557600080fd5b818901915089601f83011261285957600080fd5b81358181111561286857600080fd5b8a602082850101111561287a57600080fd5b6020830194508093505050509295509295509295565b6000602082840312156128a257600080fd5b81356125cc8161279b565b6000602082840312156128bf57600080fd5b81356125cc816127ab565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b0381118282101715612908576129086128ca565b604052919050565b60006001600160401b03821115612929576129296128ca565b50601f01601f191660200190565b600082601f83011261294857600080fd5b813561295b61295682612910565b6128e0565b81815284602083860101111561297057600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080608085870312156129a357600080fd5b84356129ae8161279b565b9350602085013592506040850135915060608501356001600160401b038111156129d757600080fd5b6129e387828801612937565b91505092959194509250565b8015158114610af957600080fd5b600060208284031215612a0f57600080fd5b81356125cc816129ef565b60008060008060808587031215612a3057600080fd5b8435612a3b8161279b565b93506020850135612a4b8161279b565b92506040850135612a5b816127ab565b915060608501356001600160401b038111156129d757600080fd5b60008060408385031215612a8957600080fd5b8235612a948161279b565b946020939093013593505050565b60008060408385031215612ab557600080fd5b8235612ac08161279b565b91506020830135612ad0816127ab565b809150509250929050565b600060208284031215612aed57600080fd5b5035919050565b600080600060608486031215612b0957600080fd5b8335612b148161279b565b92506020840135612b24816127ab565b915060408401356001600160401b03811115612b3f57600080fd5b612b4b86828701612937565b9150509250925092565b60208082526022908201527f63616c6c6572206973206e6f7420746865206c324d6573736167655265636569604082015261766560f01b606082015260800190565b60208082526019908201527f496e76616c69642064657374696e6174696f6e20636861696e00000000000000604082015260600190565b60208082526019908201527f4d65737361676520616c72656164792065786563757465642e00000000000000604082015260600190565b60005b83811015612c20578181015183820152602001612c08565b83811115612c2f576000848401525b50505050565b60008151808452612c4d816020860160208601612c05565b601f01601f19169290920160200192915050565b61ffff851681526001600160a01b03841660208201526001600160401b0383166040820152608060608201819052600090612c9e90830184612c35565b9695505050505050565b6001600160a01b03841681526040602082018190528101829052818360608301376000818301606090810191909152601f909201601f1916010192915050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b634e487b7160e01b600052601160045260246000fd5b60008219821115612d4657612d46612d1d565b500190565b6020815260006125cc6020830184612c35565b600082601f830112612d6f57600080fd5b8151612d7d61295682612910565b818152846020838601011115612d9257600080fd5b612793826020830160208701612c05565b600060208284031215612db557600080fd5b81516001600160401b0380821115612dcc57600080fd5b9083019060608286031215612de057600080fd5b604051606081018181108382111715612dfb57612dfb6128ca565b80604052508251815260208301516020820152604083015182811115612e2057600080fd5b612e2c87828601612d5e565b60408301525095945050505050565b600060208284031215612e4d57600080fd5b81516125cc816129ef565b6001600160a01b038316815260406020820181905260009061279390830184612c35565b878152600061ffff60f01b808960f01b166020840152808860f01b166022840152506bffffffffffffffffffffffff19808760601b166024840152808660601b166038840152506001600160401b0360c01b8460c01b16604c8301528251612eeb816054850160208701612c05565b9190910160540198975050505050505050565b600060208284031215612f1057600080fd5b5051919050565b61ffff87811682526001600160a01b0387811660208401529086166040830152841660608201526001600160401b038316608082015260c060a08201819052600090612f6590830184612c35565b98975050505050505050565b60008251612f83818460208701612c05565b9190910192915050565b600082821015612f9f57612f9f612d1d565b500390565b634e487b7160e01b600052603260045260246000fd5b600060208284031215612fcc57600080fd5b81516125cc8161279b565b600060208284031215612fe957600080fd5b81516125cc816127c0565b6000806040838503121561300757600080fd5b8251613012816127ab565b60208401519092506001600160401b0381111561302e57600080fd5b61303a85828601612d5e565b9150509250929050565b60006001600160401b0380831681851680830382111561306657613066612d1d565b01949350505050565b60006001820161308157613081612d1d565b5060010190565b600060ff821660ff8416808210156130a2576130a2612d1d565b90039392505050565b600181815b808511156130e65781600019048211156130cc576130cc612d1d565b808516156130d957918102915b93841c93908002906130b0565b509250929050565b6000826130fd57506001611fb2565b8161310a57506000611fb2565b8160018114613120576002811461312a57613146565b6001915050611fb2565b60ff84111561313b5761313b612d1d565b50506001821b611fb2565b5060208310610133831016604e8410600b8410161715613169575081810a611fb2565b61317383836130ab565b806000190482111561318757613187612d1d565b029392505050565b60006125cc83836130ee56fea2646970667358221220a04c4f4ada9026b0fb21d79f19ac677848582b7efb78f1856eeb781e4287b3f764736f6c634300080e0033";

type ZKBridgeConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ZKBridgeConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ZKBridge__factory extends ContractFactory {
  constructor(...args: ZKBridgeConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ZKBridge> {
    return super.deploy(overrides || {}) as Promise<ZKBridge>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ZKBridge {
    return super.attach(address) as ZKBridge;
  }
  override connect(signer: Signer): ZKBridge__factory {
    return super.connect(signer) as ZKBridge__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ZKBridgeInterface {
    return new utils.Interface(_abi) as ZKBridgeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ZKBridge {
    return new Contract(address, _abi, signerOrProvider) as ZKBridge;
  }
}
