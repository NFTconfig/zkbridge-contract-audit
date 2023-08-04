/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Setup, SetupInterface } from "../../contracts/Setup";

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
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
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
        internalType: "address",
        name: "implementation",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "lockTime",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "chainId",
        type: "uint16",
      },
      {
        internalType: "bool",
        name: "isL2",
        type: "bool",
      },
    ],
    name: "setup",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506103ab806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80633ff032071461003b57806341244ece14610057575b600080fd5b6100456201518081565b60405190815260200160405180910390f35b61006a610065366004610286565b61006c565b005b600180546001600160a01b0319166001600160a01b0386161790556000805461ffff191661ffff84161790556100a183600455565b6100aa8561017c565b600b805460ff60a01b1916600160a01b8315150217905560408051600481526024810182526020810180516001600160e01b031663204a7f0760e21b179052905160009182916001600160a01b0389169161010491610326565b600060405180830381855af49150503d806000811461013f576040519150601f19603f3d011682016040523d82523d6000602084013e610144565b606091505b50915091508181906101725760405162461bcd60e51b81526004016101699190610342565b60405180910390fd5b5050505050505050565b610185816101bc565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b6001600160a01b0381163b6102295760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b6064820152608401610169565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80546001600160a01b0319166001600160a01b0392909216919091179055565b80356001600160a01b038116811461028157600080fd5b919050565b600080600080600060a0868803121561029e57600080fd5b6102a78661026a565b94506102b56020870161026a565b935060408601359250606086013561ffff811681146102d357600080fd5b9150608086013580151581146102e857600080fd5b809150509295509295909350565b60005b838110156103115781810151838201526020016102f9565b83811115610320576000848401525b50505050565b600082516103388184602087016102f6565b9190910192915050565b60208152600082518060208401526103618160408501602087016102f6565b601f01601f1916919091016040019291505056fea264697066735822122049c961f8560e6cd488e24266f180ea27b667474ed1ed722c6f1454df20bf27a764736f6c634300080e0033";

type SetupConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SetupConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Setup__factory extends ContractFactory {
  constructor(...args: SetupConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Setup> {
    return super.deploy(overrides || {}) as Promise<Setup>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Setup {
    return super.attach(address) as Setup;
  }
  override connect(signer: Signer): Setup__factory {
    return super.connect(signer) as Setup__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SetupInterface {
    return new utils.Interface(_abi) as SetupInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Setup {
    return new Contract(address, _abi, signerOrProvider) as Setup;
  }
}