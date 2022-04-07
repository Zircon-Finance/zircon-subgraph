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

export class PairCreated extends EthereumEvent {
  get params(): PairCreated__Params {
    return new PairCreated__Params(this);
  }
}

export class PairCreated__Params {
  _event: PairCreated;

  constructor(event: PairCreated) {
    this._event = event;
  }

  get token0(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get token1(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get pair(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get param3(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class PoolTokenCreated extends EthereumEvent {
  get params(): PoolTokenCreated__Params {
    return new PoolTokenCreated__Params(this);
  }
}

export class PoolTokenCreated__Params {
  _event: PoolTokenCreated;

  constructor(event: PoolTokenCreated) {
    this._event = event;
  }

  get token0(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get poolToken(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

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

  get pair(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class Factory extends SmartContract {
  static bind(address: Address): Factory {
    return new Factory("Factory", address);
  }

  allPairs(param0: BigInt): Address {
    let result = super.call("allPairs", [
      EthereumValue.fromUnsignedBigInt(param0)
    ]);

    return result[0].toAddress();
  }

  try_allPairs(param0: BigInt): CallResult<Address> {
    let result = super.tryCall("allPairs", [
      EthereumValue.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  allPairsLength(): BigInt {
    let result = super.call("allPairsLength", []);

    return result[0].toBigInt();
  }

  try_allPairsLength(): CallResult<BigInt> {
    let result = super.tryCall("allPairsLength", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  createPair(tokenA: Address, tokenB: Address): Address {
    let result = super.call("createPair", [
      EthereumValue.fromAddress(tokenA),
      EthereumValue.fromAddress(tokenB)
    ]);

    return result[0].toAddress();
  }

  try_createPair(tokenA: Address, tokenB: Address): CallResult<Address> {
    let result = super.tryCall("createPair", [
      EthereumValue.fromAddress(tokenA),
      EthereumValue.fromAddress(tokenB)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  feeTo(): Address {
    let result = super.call("feeTo", []);

    return result[0].toAddress();
  }

  try_feeTo(): CallResult<Address> {
    let result = super.tryCall("feeTo", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  feeToSetter(): Address {
    let result = super.call("feeToSetter", []);

    return result[0].toAddress();
  }

  try_feeToSetter(): CallResult<Address> {
    let result = super.tryCall("feeToSetter", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  getPair(param0: Address, param1: Address): Address {
    let result = super.call("getPair", [
      EthereumValue.fromAddress(param0),
      EthereumValue.fromAddress(param1)
    ]);

    return result[0].toAddress();
  }

  try_getPair(param0: Address, param1: Address): CallResult<Address> {
    let result = super.tryCall("getPair", [
      EthereumValue.fromAddress(param0),
      EthereumValue.fromAddress(param1)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  migrator(): Address {
    let result = super.call("migrator", []);

    return result[0].toAddress();
  }

  try_migrator(): CallResult<Address> {
    let result = super.tryCall("migrator", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
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

  get _feeToSetter(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CreatePairCall extends EthereumCall {
  get inputs(): CreatePairCall__Inputs {
    return new CreatePairCall__Inputs(this);
  }

  get outputs(): CreatePairCall__Outputs {
    return new CreatePairCall__Outputs(this);
  }
}

export class CreatePairCall__Inputs {
  _call: CreatePairCall;

  constructor(call: CreatePairCall) {
    this._call = call;
  }

  get tokenA(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenB(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class CreatePairCall__Outputs {
  _call: CreatePairCall;

  constructor(call: CreatePairCall) {
    this._call = call;
  }

  get pair(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class SetFeeToCall extends EthereumCall {
  get inputs(): SetFeeToCall__Inputs {
    return new SetFeeToCall__Inputs(this);
  }

  get outputs(): SetFeeToCall__Outputs {
    return new SetFeeToCall__Outputs(this);
  }
}

export class SetFeeToCall__Inputs {
  _call: SetFeeToCall;

  constructor(call: SetFeeToCall) {
    this._call = call;
  }

  get _feeTo(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetFeeToCall__Outputs {
  _call: SetFeeToCall;

  constructor(call: SetFeeToCall) {
    this._call = call;
  }
}

export class SetFeeToSetterCall extends EthereumCall {
  get inputs(): SetFeeToSetterCall__Inputs {
    return new SetFeeToSetterCall__Inputs(this);
  }

  get outputs(): SetFeeToSetterCall__Outputs {
    return new SetFeeToSetterCall__Outputs(this);
  }
}

export class SetFeeToSetterCall__Inputs {
  _call: SetFeeToSetterCall;

  constructor(call: SetFeeToSetterCall) {
    this._call = call;
  }

  get _feeToSetter(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetFeeToSetterCall__Outputs {
  _call: SetFeeToSetterCall;

  constructor(call: SetFeeToSetterCall) {
    this._call = call;
  }
}

export class SetMigratorCall extends EthereumCall {
  get inputs(): SetMigratorCall__Inputs {
    return new SetMigratorCall__Inputs(this);
  }

  get outputs(): SetMigratorCall__Outputs {
    return new SetMigratorCall__Outputs(this);
  }
}

export class SetMigratorCall__Inputs {
  _call: SetMigratorCall;

  constructor(call: SetMigratorCall) {
    this._call = call;
  }

  get _migrator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetMigratorCall__Outputs {
  _call: SetMigratorCall;

  constructor(call: SetMigratorCall) {
    this._call = call;
  }
}