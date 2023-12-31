/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IZKBridgeReceiver,
  IZKBridgeReceiverInterface,
} from "../../../contracts/interfaces/IZKBridgeReceiver";

const _abi = [
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
    name: "zkReceive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IZKBridgeReceiver__factory {
  static readonly abi = _abi;
  static createInterface(): IZKBridgeReceiverInterface {
    return new utils.Interface(_abi) as IZKBridgeReceiverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IZKBridgeReceiver {
    return new Contract(address, _abi, signerOrProvider) as IZKBridgeReceiver;
  }
}
