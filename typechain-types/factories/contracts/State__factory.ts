/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { State, StateInterface } from "../../contracts/State";

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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060b48061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80633ff0320714602d575b600080fd5b60336047565b604051603e91906065565b60405180910390f35b6201518081565b6000819050919050565b605f81604e565b82525050565b6000602082019050607860008301846058565b9291505056fea26469706673582212203f71d0b1ce7b92a6a5b81d3a4b6dbc41f64debcbab33f5f7c0cc529bb9b47e2264736f6c63430008130033";

type StateConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StateConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class State__factory extends ContractFactory {
  constructor(...args: StateConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<State> {
    return super.deploy(overrides || {}) as Promise<State>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): State {
    return super.attach(address) as State;
  }
  override connect(signer: Signer): State__factory {
    return super.connect(signer) as State__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StateInterface {
    return new utils.Interface(_abi) as StateInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): State {
    return new Contract(address, _abi, signerOrProvider) as State;
  }
}