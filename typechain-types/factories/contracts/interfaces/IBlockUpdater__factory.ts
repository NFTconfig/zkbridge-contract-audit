/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IBlockUpdater,
  IBlockUpdaterInterface,
} from "../../../contracts/interfaces/IBlockUpdater";

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
        name: "receiptsRoot",
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

export class IBlockUpdater__factory {
  static readonly abi = _abi;
  static createInterface(): IBlockUpdaterInterface {
    return new utils.Interface(_abi) as IBlockUpdaterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IBlockUpdater {
    return new Contract(address, _abi, signerOrProvider) as IBlockUpdater;
  }
}
