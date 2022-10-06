/* eslint-disable prefer-const */
import { Pair, Token, Bundle } from '../types/schema'
import { BigDecimal, Address, BigInt, log } from '@graphprotocol/graph-ts/index'
import { ZERO_BD, factoryContract, ADDRESS_ZERO, ONE_BD, UNTRACKED_PAIRS } from './helpers'

const WETH_ADDRESS = '0x98878b06940ae243284ca214f92bb71a2b032b8a'
const WMOVR_USDC_PAIR = '0xcc2a7cef44caa59847699104629e034ea7d89f6a' 
 // created block 10093341

export function getEthPriceInUSD(): BigDecimal {
  // fetch eth prices for each stablecoin
  let movrUsdcPair = Pair.load(WMOVR_USDC_PAIR) 

  // all 3 have been created
  if (movrUsdcPair !== null) {
    return movrUsdcPair.token1Price
  } else {
    return ZERO_BD
  }
}

// token where amounts should contribute to tracked volume and liquidity
let WHITELIST: string[] = [
  '0x4545e94974adacb82fc56bcf136b07943e152055', // ZRG
  '0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d', // USDC
  '0x639a647fbe20b6c8ac19e48e2de44ea792c62c5c', // ETH
  '0x6ccf12b480a99c54b23647c995f4525d544a7e72', // LDO
  '0xffffffff1fcacbd218edc0eba20fc2308c778080', // xcKSM
  '0xffffffff893264794d9d57e1e0e21e0042af5a0a', // xcRMRK
  '0xfffffffff6e528ad57184579beee00c5d5e646f0', // xcKBTC
  '0xbb8d88bcd9749636bc4d2be22aac4bb3b01a58f1', // MFAM
]

// minimum liquidity required to count towards tracked volume for pairs with small # of Lps
let MINIMUM_USD_THRESHOLD_NEW_PAIRS = BigDecimal.fromString('1')

// minimum liquidity for price to get tracked
let MINIMUM_LIQUIDITY_THRESHOLD_ETH = BigDecimal.fromString('0.0000001')

/**
 * Search through graph to find derived Eth per token.
 * @todo update to be derived ETH (add stablecoin estimates)
 **/
export function findEthPerToken(token: Token): BigDecimal {
  if (token.id == WETH_ADDRESS) {
    return ONE_BD
  }
  // loop through whitelist and check if paired with any
    // let pairAddress = factoryContract.getPair(Address.fromString(token.id), Address.fromString(WHITELIST[i]))
    // if (pairAddress.toHexString() != ADDRESS_ZERO) {
    //   let pair = Pair.load(pairAddress.toHexString())
    //   if (pair.token0 == token.id && pair.reserveETH.gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
    //     let token1 = Token.load(pair.token1)
    //     return pair.token1Price.times(token1.derivedETH as BigDecimal) // return token1 per our token * Eth per token 1
    //   }
    //   if (pair.token1 == token.id && pair.reserveETH.gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
    //     let token0 = Token.load(pair.token0)
    //     return pair.token0Price.times(token0.derivedETH as BigDecimal) // return token0 per our token * ETH per token 0
    //   }
    // }
    if (token.id == '0x4545e94974adacb82fc56bcf136b07943e152055') { // ZRG
      let pair = Pair.load('0x89bb1bd89c764e1c2d4aa6469062590732b26323')
      if(pair !== null) {
      return pair.token1Price
      } else { return ZERO_BD }
    } else if (token.id == '0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d') { // USDC
      let pair = Pair.load('0xcc2a7cef44caa59847699104629e034ea7d89f6a')
      if(pair !== null) {
        return pair.token0Price
        } else { return ZERO_BD }
    } else if (token.id == '0x639a647fbe20b6c8ac19e48e2de44ea792c62c5c') { // ETH
      let pair = Pair.load('0xaefafaa837cdd8a35afc11100069e073257c0e3e')
      if(pair !== null) {
        return pair.token0Price
        } else { return ZERO_BD }
    } else if (token.id == '0x6ccf12b480a99c54b23647c995f4525d544a7e72') { // LDO
      let pair = Pair.load('0xdea4e4c9e55bb3720d1944e9465fd87a1a704261')
      if(pair !== null) {
        return pair.token1Price
        } else { return ZERO_BD }
    } else if (token.id == '0xffffffff1fcacbd218edc0eba20fc2308c778080') { // xcKSM
      let pair = Pair.load('0xd80b9003740ca40cc5f77b3298409809281a622f')
      if(pair !== null) {
        return pair.token1Price
        } else { return ZERO_BD }
    } else if (token.id == '0xffffffff893264794d9d57e1e0e21e0042af5a0a') { // xcRMRK
      let pair = Pair.load('0xc702ca41245205b699da7799e8cbb7b13f5936c5')
      if(pair !== null) {
        return pair.token0Price
        } else { return ZERO_BD }
    } else if (token.id == '0xbb8d88bcd9749636bc4d2be22aac4bb3b01a58f1') { // MFAM
      let pair = Pair.load('0x69137360e23733a7f31f0b51421b681bb6d8a763')
      if(pair !== null) {
        return pair.token0Price
        } else { return ZERO_BD }
    } else return ZERO_BD
    
}

/**
 * Accepts tokens and amounts, return tracked amount based on token whitelist
 * If one token on whitelist, return amount in that token converted to USD.
 * If both are, return average of two amounts
 * If neither is, return 0
 */
export function getTrackedVolumeUSD(
  tokenAmount0: BigDecimal,
  token0: Token,
  tokenAmount1: BigDecimal,
  token1: Token,
  pair: Pair
): BigDecimal {
  let bundle = Bundle.load('1')
  let price0 = token0.derivedETH.times(bundle.ethPrice)
  let price1 = token1.derivedETH.times(bundle.ethPrice)

  // dont count tracked volume on these pairs - usually rebass tokens
  if (UNTRACKED_PAIRS.includes(pair.id)) {
    return ZERO_BD
  }

  // if less than 5 LPs, require high minimum reserve amount amount or return 0
  if (pair.liquidityProviderCount.lt(BigInt.fromI32(5))) {
    let reserve0USD = pair.reserve0.times(price0)
    let reserve1USD = pair.reserve1.times(price1)
    if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
      if (reserve0USD.plus(reserve1USD).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) {
        return ZERO_BD
      }
    }
    if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
      if (reserve0USD.times(BigDecimal.fromString('2')).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) {
        return ZERO_BD
      }
    }
    if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
      if (reserve1USD.times(BigDecimal.fromString('2')).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) {
        return ZERO_BD
      }
    }
  }

  // both are whitelist tokens, take average of both amounts
  if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return tokenAmount0
      .times(price0)
      .plus(tokenAmount1.times(price1))
      .div(BigDecimal.fromString('2'))
  }

  // take full value of the whitelisted token amount
  if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
    return tokenAmount0.times(price0)
  }

  // take full value of the whitelisted token amount
  if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return tokenAmount1.times(price1)
  }

  // neither token is on white list, tracked volume is 0
  return ZERO_BD
}

/**
 * Accepts tokens and amounts, return tracked amount based on token whitelist
 * If one token on whitelist, return amount in that token converted to USD * 2.
 * If both are, return sum of two amounts
 * If neither is, return 0
 */
export function getTrackedLiquidityUSD(
  tokenAmount0: BigDecimal,
  token0: Token,
  tokenAmount1: BigDecimal,
  token1: Token
): BigDecimal {
  let bundle = Bundle.load('1')
  let price0 = token0.derivedETH.times(bundle.ethPrice)
  let price1 = token1.derivedETH.times(bundle.ethPrice)

  // both are whitelist tokens, take average of both amounts
  if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return tokenAmount0.times(price0).plus(tokenAmount1.times(price1))
  }

  // take double value of the whitelisted token amount
  if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
    return tokenAmount0.times(price0).times(BigDecimal.fromString('2'))
  }

  // take double value of the whitelisted token amount
  if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return tokenAmount1.times(price1).times(BigDecimal.fromString('2'))
  }

  // neither token is on white list, tracked volume is 0
  return ZERO_BD
}
