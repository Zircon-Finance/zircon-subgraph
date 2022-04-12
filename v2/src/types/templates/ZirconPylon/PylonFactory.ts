// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  EthereumCall,
  EthereumEvent,
  SmartContract,
  EthereumValue,
  JSONValue,
  TypedMap,
  Entity,
  EthereumTuple,
  Bytes,
  Address,
  BigInt,
  CallResult
} from "@graphprotocol/graph-ts";

export class PylonCreated extends EthereumEvent {
  get params(): PylonCreated__Params {
    return new PylonCreated__Params(this);
  }
}

export class PylonCreated__Params {
  _event: PylonCreated;

  constructor(event: PylonCreated) {
    this._event = event;
  }

  get token0(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get token1(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get poolToken0(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get poolToken1(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get pylon(): Address {
    return this._event.parameters[4].value.toAddress();
  }

  get pair(): Address {
    return this._event.parameters[5].value.toAddress();
  }
}

export class PylonFactory extends SmartContract {
  static bind(address: Address): PylonFactory {
    return new PylonFactory("PylonFactory", address);
  }

  addPylon(_pairAddress: Address, _tokenA: Address, _tokenB: Address): Address {
    let result = super.call("addPylon", [
      EthereumValue.fromAddress(_pairAddress),
      EthereumValue.fromAddress(_tokenA),
      EthereumValue.fromAddress(_tokenB)
    ]);

    return result[0].toAddress();
  }

  try_addPylon(
    _pairAddress: Address,
    _tokenA: Address,
    _tokenB: Address
  ): CallResult<Address> {
    let result = super.tryCall("addPylon", [
      EthereumValue.fromAddress(_pairAddress),
      EthereumValue.fromAddress(_tokenA),
      EthereumValue.fromAddress(_tokenB)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  allPylons(param0: BigInt): Address {
    let result = super.call("allPylons", [
      EthereumValue.fromUnsignedBigInt(param0)
    ]);

    return result[0].toAddress();
  }

  try_allPylons(param0: BigInt): CallResult<Address> {
    let result = super.tryCall("allPylons", [
      EthereumValue.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  allPylonsLength(): BigInt {
    let result = super.call("allPylonsLength", []);

    return result[0].toBigInt();
  }

  try_allPylonsLength(): CallResult<BigInt> {
    let result = super.tryCall("allPylonsLength", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  dynamicFeePercentage(): BigInt {
    let result = super.call("dynamicFeePercentage", []);

    return result[0].toBigInt();
  }

  try_dynamicFeePercentage(): CallResult<BigInt> {
    let result = super.tryCall("dynamicFeePercentage", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  energyFactory(): Address {
    let result = super.call("energyFactory", []);

    return result[0].toAddress();
  }

  try_energyFactory(): CallResult<Address> {
    let result = super.tryCall("energyFactory", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  factory(): Address {
    let result = super.call("factory", []);

    return result[0].toAddress();
  }

  try_factory(): CallResult<Address> {
    let result = super.tryCall("factory", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  getPylon(param0: Address, param1: Address): Address {
    let result = super.call("getPylon", [
      EthereumValue.fromAddress(param0),
      EthereumValue.fromAddress(param1)
    ]);

    return result[0].toAddress();
  }

  try_getPylon(param0: Address, param1: Address): CallResult<Address> {
    let result = super.tryCall("getPylon", [
      EthereumValue.fromAddress(param0),
      EthereumValue.fromAddress(param1)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  maximumPercentageSync(): BigInt {
    let result = super.call("maximumPercentageSync", []);

    return result[0].toBigInt();
  }

  try_maximumPercentageSync(): CallResult<BigInt> {
    let result = super.tryCall("maximumPercentageSync", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  pairCodeHash(): Bytes {
    let result = super.call("pairCodeHash", []);

    return result[0].toBytes();
  }

  try_pairCodeHash(): CallResult<Bytes> {
    let result = super.tryCall("pairCodeHash", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBytes());
  }
}

export class ConstructorCall extends EthereumCall {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _factory(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddPylonCall extends EthereumCall {
  get inputs(): AddPylonCall__Inputs {
    return new AddPylonCall__Inputs(this);
  }

  get outputs(): AddPylonCall__Outputs {
    return new AddPylonCall__Outputs(this);
  }
}

export class AddPylonCall__Inputs {
  _call: AddPylonCall;

  constructor(call: AddPylonCall) {
    this._call = call;
  }

  get _pairAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _tokenA(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _tokenB(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class AddPylonCall__Outputs {
  _call: AddPylonCall;

  constructor(call: AddPylonCall) {
    this._call = call;
  }

  get pylonAddress(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}
