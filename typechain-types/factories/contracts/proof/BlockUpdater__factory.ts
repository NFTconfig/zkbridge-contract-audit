/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  BlockUpdater,
  BlockUpdaterInterface,
} from "../../../contracts/proof/BlockUpdater";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "receiptHash",
        type: "bytes32",
      },
    ],
    name: "checkBlock",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610153806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063dc3588ea14610030575b600080fd5b61004a600480360381019061004591906100a7565b610060565b6040516100579190610102565b60405180910390f35b60006001905092915050565b600080fd5b6000819050919050565b61008481610071565b811461008f57600080fd5b50565b6000813590506100a18161007b565b92915050565b600080604083850312156100be576100bd61006c565b5b60006100cc85828601610092565b92505060206100dd85828601610092565b9150509250929050565b60008115159050919050565b6100fc816100e7565b82525050565b600060208201905061011760008301846100f3565b9291505056fea26469706673582212208a0b2d272b6ff97a73488c2ba82f7d14341ed8e79171cd8cf7027167d9c2ab9564736f6c63430008130033";

type BlockUpdaterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BlockUpdaterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BlockUpdater__factory extends ContractFactory {
  constructor(...args: BlockUpdaterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BlockUpdater> {
    return super.deploy(overrides || {}) as Promise<BlockUpdater>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): BlockUpdater {
    return super.attach(address) as BlockUpdater;
  }
  override connect(signer: Signer): BlockUpdater__factory {
    return super.connect(signer) as BlockUpdater__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BlockUpdaterInterface {
    return new utils.Interface(_abi) as BlockUpdaterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BlockUpdater {
    return new Contract(address, _abi, signerOrProvider) as BlockUpdater;
  }
}
