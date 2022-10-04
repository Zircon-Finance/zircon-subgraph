import { log } from "@graphprotocol/graph-ts"
import { PylonCreated } from "../types/ZirconPylonFactory/ZirconPylonFactory"
import { Bundle, Pylon, PylonFactory, Token } from "../types/schema"
import { Pylon as PylonTemplate } from "../types/templates"
import { fetchTokenDecimals, fetchTokenName, fetchTokenSymbol, fetchTokenTotalSupply, ONE_BI, PYLON_FACTORY_ADDRESS, ZERO_BD, ZERO_BI } from "./helpers"

export function handlePylonCreated(event: PylonCreated): void {
    // load factory (create if first exchange)
    let factory = PylonFactory.load(PYLON_FACTORY_ADDRESS)
    if (factory === null) {
      factory = new PylonFactory(PYLON_FACTORY_ADDRESS)
      factory.pylonCount = ZERO_BI
      factory.txCount = ZERO_BI
      factory.totalLiquidityETH = ZERO_BD
      factory.totalVolumeETH = ZERO_BD
  
      // create new bundle
      let bundle = new Bundle('1')
      bundle.ethPrice = ZERO_BD
      bundle.save()
    }
    factory.pylonCount = factory.pylonCount.plus(ONE_BI)
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
  
    let pylon = new Pylon(event.params.pylon.toHexString()) as Pylon
    pylon.token0 = token0.id
    pylon.token1 = token1.id
    pylon.reserve0 = ZERO_BD
    pylon.reserve1 = ZERO_BD
    pylon.reserveETH = ZERO_BD
    pylon.totalSupply = ZERO_BD
    pylon.txCount = ZERO_BI
    pylon.trackedReserveETH = ZERO_BD
    pylon.token0Price = ZERO_BD
    pylon.token1Price = ZERO_BD
    pylon.volumeToken0 = ZERO_BD
    pylon.volumeToken1 = ZERO_BD
    // pylon.poolToken0 = event.params.poolToken0
    // pylon.poolToken1 = event.params.poolToken1
    pylon.pairId = event.params.pair
    pylon.createdAtTimestamp = event.block.timestamp
    pylon.createdAtBlockNumber = event.block.number
  
    // create the tracked contract based on the template
    PylonTemplate.create(event.params.pylon)
  
    // //Creating pool Token
    // let poolToken = new ZirconPoolTokenEntity(event.params.poolToken0.toHexString())
    // poolToken.token = token0.id
    // poolToken.pair = event.params.pair
    // poolToken.pylon = event.params.pylon
    // poolToken.isAnchor = false
    // poolToken.factory = event.params.pair //TODO: Pass Factory Address
    // poolToken.createdAtTimestamp = event.block.timestamp
    // poolToken.createdAtBlockNumber = event.block.number
  
    // let poolToken1 = new ZirconPoolTokenEntity(event.params.poolToken1.toHexString())
    // poolToken1.token = token1.id
    // poolToken1.pair = event.params.pair
    // poolToken1.pylon = event.params.pylon
    // poolToken1.factory = event.params.pair
    // poolToken1.isAnchor = true
    // poolToken1.createdAtTimestamp = event.block.timestamp
    // poolToken1.createdAtBlockNumber = event.block.number
  
    // // create the tracked contract based on the template
    // ZirconPoolToken.create(event.params.poolToken0)
    // ZirconPoolToken.create(event.params.poolToken1)
  
    // save updated values
    // poolToken.save()
    // poolToken1.save()

    token0.save()
    token1.save()
    pylon.save()
    factory.save()
  }