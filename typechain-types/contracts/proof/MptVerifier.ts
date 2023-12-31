/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export declare namespace MptVerifier {
  export type ReceiptStruct = {
    receiptHash: PromiseOrValue<BytesLike>;
    state: PromiseOrValue<BigNumberish>;
    logs: PromiseOrValue<BytesLike>;
  };

  export type ReceiptStructOutput = [string, BigNumber, string] & {
    receiptHash: string;
    state: BigNumber;
    logs: string;
  };
}

export interface MptVerifierInterface extends utils.Interface {
  functions: {
    "validateMPT(bytes)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "validateMPT"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "validateMPT",
    values: [PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(
    functionFragment: "validateMPT",
    data: BytesLike
  ): Result;

  events: {};
}

export interface MptVerifier extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MptVerifierInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    validateMPT(
      proofBlob: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [MptVerifier.ReceiptStructOutput] & {
        receipt: MptVerifier.ReceiptStructOutput;
      }
    >;
  };

  validateMPT(
    proofBlob: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<MptVerifier.ReceiptStructOutput>;

  callStatic: {
    validateMPT(
      proofBlob: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<MptVerifier.ReceiptStructOutput>;
  };

  filters: {};

  estimateGas: {
    validateMPT(
      proofBlob: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    validateMPT(
      proofBlob: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
