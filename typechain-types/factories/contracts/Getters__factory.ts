/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Getters, GettersInterface } from "../../contracts/Getters";

const _abi = [
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061096e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806376348f7111610097578063aa4efa5b11610066578063aa4efa5b1461027a578063bd51f42e146102aa578063d60b347f146102da578063fe2db7d01461030a576100f5565b806376348f71146102025780638da5cb5b146102205780639a8a05921461023e5780639f0a22a61461025c576100f5565b8063396f7b23116100d3578063396f7b23146101665780633ff032071461018457806366798c2c146101a25780636b83252a146101d2576100f5565b80630232c006146100fa5780630d6680871461011857806336ae03d814610136575b600080fd5b61010261033a565b60405161010f9190610645565b60405180910390f35b610120610366565b60405161012d9190610679565b60405180910390f35b610150600480360381019061014b91906106d3565b610372565b60405161015d9190610721565b60405180910390f35b61016e6103b9565b60405161017b9190610721565b60405180910390f35b61018c6103e5565b6040516101999190610679565b60405180910390f35b6101bc60048036038101906101b791906106d3565b6103ec565b6040516101c9919061075d565b60405180910390f35b6101ec60048036038101906101e791906106d3565b610433565b6040516101f99190610799565b60405180910390f35b61020a61047a565b60405161021791906107cf565b60405180910390f35b610228610493565b6040516102359190610721565b60405180910390f35b6102466104bf565b60405161025391906107f9565b60405180910390f35b6102646104dc565b6040516102719190610679565b60405180910390f35b610294600480360381019061028f919061084a565b6104e8565b6040516102a191906107cf565b60405180910390f35b6102c460048036038101906102bf919061084a565b610514565b6040516102d1919061089a565b60405180910390f35b6102f460048036038101906102ef91906108e1565b610547565b60405161030191906107cf565b60405180910390f35b610324600480360381019061031f91906106d3565b61059f565b604051610331919061091d565b60405180910390f35b600080600b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060040154905090565b600080600c0160008361ffff1661ffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6201518081565b600080600a0160008361ffff1661ffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008060090160008361ffff1661ffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600080600b0160149054906101000a900460ff16905090565b60008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060000160000160009054906101000a900461ffff16905090565b60008060030154905090565b600080600801600083815260200190815260200160002060009054906101000a900460ff169050919050565b600080600501600083815260200190815260200160002060009054906101000a900467ffffffffffffffff169050919050565b60008060070160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b60008060060160008361ffff1661ffff168152602001908152602001600020549050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061060b610606610601846105c6565b6105e6565b6105c6565b9050919050565b600061061d826105f0565b9050919050565b600061062f82610612565b9050919050565b61063f81610624565b82525050565b600060208201905061065a6000830184610636565b92915050565b6000819050919050565b61067381610660565b82525050565b600060208201905061068e600083018461066a565b92915050565b600080fd5b600061ffff82169050919050565b6106b081610699565b81146106bb57600080fd5b50565b6000813590506106cd816106a7565b92915050565b6000602082840312156106e9576106e8610694565b5b60006106f7848285016106be565b91505092915050565b600061070b826105c6565b9050919050565b61071b81610700565b82525050565b60006020820190506107366000830184610712565b92915050565b600061074782610612565b9050919050565b6107578161073c565b82525050565b6000602082019050610772600083018461074e565b92915050565b600061078382610612565b9050919050565b61079381610778565b82525050565b60006020820190506107ae600083018461078a565b92915050565b60008115159050919050565b6107c9816107b4565b82525050565b60006020820190506107e460008301846107c0565b92915050565b6107f381610699565b82525050565b600060208201905061080e60008301846107ea565b92915050565b6000819050919050565b61082781610814565b811461083257600080fd5b50565b6000813590506108448161081e565b92915050565b6000602082840312156108605761085f610694565b5b600061086e84828501610835565b91505092915050565b600067ffffffffffffffff82169050919050565b61089481610877565b82525050565b60006020820190506108af600083018461088b565b92915050565b6108be81610700565b81146108c957600080fd5b50565b6000813590506108db816108b5565b92915050565b6000602082840312156108f7576108f6610694565b5b6000610905848285016108cc565b91505092915050565b61091781610814565b82525050565b6000602082019050610932600083018461090e565b9291505056fea26469706673582212207a99a9f68d04dddf1dfd09829d61be35618f883560f38a431cb86dd515ba4d3764736f6c63430008130033";

type GettersConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GettersConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Getters__factory extends ContractFactory {
  constructor(...args: GettersConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Getters> {
    return super.deploy(overrides || {}) as Promise<Getters>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Getters {
    return super.attach(address) as Getters;
  }
  override connect(signer: Signer): Getters__factory {
    return super.connect(signer) as Getters__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GettersInterface {
    return new utils.Interface(_abi) as GettersInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Getters {
    return new Contract(address, _abi, signerOrProvider) as Getters;
  }
}