/* eslint-disable prefer-const */
import { log } from '@graphprotocol/graph-ts'
import { PairCreated, PylonCreated } from '../types/Factory/Factory'
import { Bundle, Pair, Pylon, Token, UniswapFactory, ZirconFactory, ZirconPoolTokenEntity } from '../types/schema'
import { Pair as PairTemplate, Zircon, ZirconPoolToken } from '../types/templates'
import { PoolTokenCreated } from '../types/ZirconPylonFactory/ZirconPylonFactory'
import {
  FACTORY_ADDRESS,
  fetchTokenDecimals,
  fetchTokenName,
  fetchTokenSymbol,
  fetchTokenTotalSupply,
  ONE_BI,
  PYLON_FACTORY,
  ZERO_BD,
  ZERO_BI,
} from './helpers'

export function handleNewPair(event: PairCreated): void {
  // load factory (create if first exchange)
  let factory = UniswapFactory.load(FACTORY_ADDRESS)
  if (factory === null) {
    factory = new UniswapFactory(FACTORY_ADDRESS)
    factory.pairCount = 0
    factory.totalVolumeETH = ZERO_BD
    factory.totalLiquidityETH = ZERO_BD
    factory.totalVolumeUSD = ZERO_BD
    factory.untrackedVolumeUSD = ZERO_BD
    factory.totalLiquidityUSD = ZERO_BD
    factory.txCount = ZERO_BI

    // create new bundle
    let bundle = new Bundle('1')
    bundle.ethPrice = ZERO_BD
    bundle.save()
  }
  factory.pairCount = factory.pairCount + 1
  factory.save()

  // create the tokens
  let token0 = Token.load(event.params.token0.toHexString())
  let token1 = Token.load(event.params.token1.toHexString())

  // fetch info if null
  if (token0 === null) {
    token0 = new Token(event.params.token0.toHexString())
    token0.symbol = fetchTokenSymbol(event.params.token0)
    token0.name = fetchTokenName(event.params.token0)
    token0.totalSupply = fetchTokenTotalSupply(event.params.token0)
    let decimals = fetchTokenDecimals(event.params.token0)

    // bail if we couldn't figure out the decimals
    if (decimals === null) {
      log.debug('mybug the decimal on token 0 was null', [])
      return
    }

    token0.decimals = decimals
    token0.derivedETH = ZERO_BD
    token0.tradeVolume = ZERO_BD
    token0.tradeVolumeUSD = ZERO_BD
    token0.untrackedVolumeUSD = ZERO_BD
    token0.totalLiquidity = ZERO_BD
    // token0.allPairs = []
    token0.txCount = ZERO_BI
  }

  // fetch info if null
  if (token1 === null) {
    token1 = new Token(event.params.token1.toHexString())
    token1.symbol = fetchTokenSymbol(event.params.token1)
    token1.name = fetchTokenName(event.params.token1)
    token1.totalSupply = fetchTokenTotalSupply(event.params.token1)
    let decimals = fetchTokenDecimals(event.params.token1)

    // bail if we couldn't figure out the decimals
    if (decimals === null) {
      return
    }
    token1.decimals = decimals
    token1.derivedETH = ZERO_BD
    token1.tradeVolume = ZERO_BD
    token1.tradeVolumeUSD = ZERO_BD
    token1.untrackedVolumeUSD = ZERO_BD
    token1.totalLiquidity = ZERO_BD
    // token1.allPairs = []
    token1.txCount = ZERO_BI
  }

  let pair = new Pair(event.params.pair.toHexString()) as Pair
  pair.token0 = token0.id
  pair.token1 = token1.id
  pair.liquidityProviderCount = ZERO_BI
  pair.createdAtTimestamp = event.block.timestamp
  pair.createdAtBlockNumber = event.block.number
  pair.txCount = ZERO_BI
  pair.reserve0 = ZERO_BD
  pair.reserve1 = ZERO_BD
  pair.trackedReserveETH = ZERO_BD
  pair.reserveETH = ZERO_BD
  pair.reserveUSD = ZERO_BD
  pair.totalSupply = ZERO_BD
  pair.volumeToken0 = ZERO_BD
  pair.volumeToken1 = ZERO_BD
  pair.volumeUSD = ZERO_BD
  pair.untrackedVolumeUSD = ZERO_BD
  pair.token0Price = ZERO_BD
  pair.token1Price = ZERO_BD

  // create the tracked contract based on the template
  PairTemplate.create(event.params.pair)

  // save updated values
  token0.save()
  token1.save()
  pair.save()
  factory.save()
}

export function handlePylonCreated(event: PylonCreated): void {
  // load factory (create if first exchange)
  log.warning('Calling handlePylonCreated {}', ['Working'])
  let factory = ZirconFactory.load(PYLON_FACTORY)
  if (factory === null) {
    factory = new ZirconFactory(FACTORY_ADDRESS)
    factory.pylonCount = ZERO_BI
    factory.txCount = ZERO_BI

    // create new bundle
    let bundle = new Bundle('1')
    bundle.ethPrice = ZERO_BD
    bundle.save()
  }
  factory.pylonCount = factory.pylonCount.plus(ONE_BI)
  factory.save()

  // create the tokens
  let token0 = Token.load(event.params.token0.toHexString())
  log.warning('Calling handlePylonCreated for token {}', [token0.name])
  let token1 = Token.load(event.params.token1.toHexString())
  log.warning('Calling handlePylonCreated for token {}', [token1.name])

  // fetch info if null
  if (token0 === null) {
    token0 = new Token(event.params.token0.toHexString())
    token0.symbol = fetchTokenSymbol(event.params.token0)
    token0.name = fetchTokenName(event.params.token0)
    token0.totalSupply = fetchTokenTotalSupply(event.params.token0)
    let decimals = fetchTokenDecimals(event.params.token0)

    // bail if we couldn't figure out the decimals
    if (decimals === null) {
      log.debug('mybug the decimal on token 0 was null', [])
      return
    }

    token0.decimals = decimals
    token0.derivedETH = ZERO_BD
    token0.tradeVolume = ZERO_BD
    token0.tradeVolumeUSD = ZERO_BD
    token0.untrackedVolumeUSD = ZERO_BD
    token0.totalLiquidity = ZERO_BD
    // token0.allPairs = []
    token0.txCount = ZERO_BI
  }

  // fetch info if null
  if (token1 === null) {
    token1 = new Token(event.params.token1.toHexString())
    token1.symbol = fetchTokenSymbol(event.params.token1)
    token1.name = fetchTokenName(event.params.token1)
    token1.totalSupply = fetchTokenTotalSupply(event.params.token1)
    let decimals = fetchTokenDecimals(event.params.token1)

    // bail if we couldn't figure out the decimals
    if (decimals === null) {
      return
    }
    token1.decimals = decimals
    token1.derivedETH = ZERO_BD
    token1.tradeVolume = ZERO_BD
    token1.tradeVolumeUSD = ZERO_BD
    token1.untrackedVolumeUSD = ZERO_BD
    token1.totalLiquidity = ZERO_BD
    // token1.allPairs = []
    token1.txCount = ZERO_BI
  }

  let pylon = new Pylon(event.params.pair.toHexString()) as Pylon
  pylon.token0 = token0.id
  pylon.token1 = token1.id
  pylon.pairId = event.params.pair
  pylon.createdAtTimestamp = event.block.timestamp
  pylon.createdAtBlockNumber = event.block.number

  // create the tracked contract based on the template
  Zircon.create(event.params.pair)

  // save updated values
  token0.save()
  token1.save()
  pylon.save()
  factory.save()
}

export function handlePoolTokenCreated(event: PoolTokenCreated): void {
  // load factory (create if first exchange)
  log.warning('Calling handlePoolTokenCreated {}', ['Working'])
  let factory = ZirconFactory.load(PYLON_FACTORY)
  if (factory === null) {
    factory = new ZirconFactory(FACTORY_ADDRESS)
    factory.pylonCount = ZERO_BI
    factory.txCount = ZERO_BI

    // create new bundle
    let bundle = new Bundle('1')
    bundle.ethPrice = ZERO_BD
    bundle.save()
  }
  factory.save()

  // create the tokens
  let token0 = Token.load(event.params.token.toHexString())
  log.warning('Calling new pool token for token {}', [token0.name])

  // fetch info if null
  if (token0 === null) {
    token0 = new Token(event.params.token.toHexString())
    token0.symbol = fetchTokenSymbol(event.params.token)
    token0.name = fetchTokenName(event.params.token)
    token0.totalSupply = fetchTokenTotalSupply(event.params.token)
    let decimals = fetchTokenDecimals(event.params.token)

    // bail if we couldn't figure out the decimals
    if (decimals === null) {
      log.debug('mybug the decimal on token 0 was null', [])
      return
    }

    token0.decimals = decimals
    token0.derivedETH = ZERO_BD
    token0.tradeVolume = ZERO_BD
    token0.tradeVolumeUSD = ZERO_BD
    token0.untrackedVolumeUSD = ZERO_BD
    token0.totalLiquidity = ZERO_BD
    // token0.allPairs = []
    token0.txCount = ZERO_BI
  }

  let poolToken = new ZirconPoolTokenEntity(event.params.poolToken.toHexString())
  poolToken.token = token0.id
  poolToken.pair = event.params.pair
  poolToken.pylon = event.params.pylon
  poolToken.isAnchor = event.params.isAnchor
  poolToken.createdAtTimestamp = event.block.timestamp
  poolToken.createdAtBlockNumber = event.block.number

  // create the tracked contract based on the template
  ZirconPoolToken.create(event.params.poolToken)

  // save updated values
  token0.save()
  poolToken.save()
  factory.save()
}