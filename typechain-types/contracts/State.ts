/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
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
} from "../common";

export interface StateInterface extends utils.Interface {
  functions: {
    "MIN_LOCK_TIME()": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "MIN_LOCK_TIME"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "MIN_LOCK_TIME",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "MIN_LOCK_TIME",
    data: BytesLike
  ): Result;

  events: {};
}

export interface State extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: StateInterface;

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
    MIN_LOCK_TIME(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  MIN_LOCK_TIME(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    MIN_LOCK_TIME(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    MIN_LOCK_TIME(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    MIN_LOCK_TIME(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
