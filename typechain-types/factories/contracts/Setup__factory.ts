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
  "0x608060405234801561001057600080fd5b5061073b806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80633ff032071461003b57806341244ece14610059575b600080fd5b610043610075565b60405161005091906103cc565b60405180910390f35b610073600480360381019061006e91906104e8565b61007c565b005b6201518081565b610085846101e5565b61008e8261022c565b61009783610251565b6100a08561025e565b6100a9816102ad565b6000808673ffffffffffffffffffffffffffffffffffffffff166040516024016040516020818303038152906040527f8129fc1c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505060405161015391906105d4565b600060405180830381855af49150503d806000811461018e576040519150601f19603f3d011682016040523d82523d6000602084013e610193565b606091505b50915091508181906101db576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101d29190610651565b60405180910390fd5b5050505050505050565b80600060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b806000800160000160006101000a81548161ffff021916908361ffff16021790555050565b8060006004018190555050565b610267816102cd565b8073ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a250565b806000600b0160146101000a81548160ff02191690831515021790555050565b6102d681610386565b610315576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161030c906106e5565b60405180910390fd5b806103427f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b6103a9565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000819050919050565b6000819050919050565b6103c6816103b3565b82525050565b60006020820190506103e160008301846103bd565b92915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610417826103ec565b9050919050565b6104278161040c565b811461043257600080fd5b50565b6000813590506104448161041e565b92915050565b610453816103b3565b811461045e57600080fd5b50565b6000813590506104708161044a565b92915050565b600061ffff82169050919050565b61048d81610476565b811461049857600080fd5b50565b6000813590506104aa81610484565b92915050565b60008115159050919050565b6104c5816104b0565b81146104d057600080fd5b50565b6000813590506104e2816104bc565b92915050565b600080600080600060a08688031215610504576105036103e7565b5b600061051288828901610435565b955050602061052388828901610435565b945050604061053488828901610461565b93505060606105458882890161049b565b9250506080610556888289016104d3565b9150509295509295909350565b600081519050919050565b600081905092915050565b60005b8381101561059757808201518184015260208101905061057c565b60008484015250505050565b60006105ae82610563565b6105b8818561056e565b93506105c8818560208601610579565b80840191505092915050565b60006105e082846105a3565b915081905092915050565b600081519050919050565b600082825260208201905092915050565b6000601f19601f8301169050919050565b6000610623826105eb565b61062d81856105f6565b935061063d818560208601610579565b61064681610607565b840191505092915050565b6000602082019050818103600083015261066b8184610618565b905092915050565b7f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60008201527f6f74206120636f6e747261637400000000000000000000000000000000000000602082015250565b60006106cf602d836105f6565b91506106da82610673565b604082019050919050565b600060208201905081810360008301526106fe816106c2565b905091905056fea2646970667358221220d5273f41e19b7d221f4dc10e7c60af4ff00077d6c207cc3275567ed6c8e6ec1764736f6c63430008130033";

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
