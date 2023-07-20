import request from 'superagent'
import { fetchEthPriceModel } from '../models/ethModels'

const etherscanURL = 'https://api.etherscan.io/api'

const apiKey = 'THWJ7IUUNKYV24EIRNPWQNRCBT1G35CXZD'

export function fetchEthPrice() {
  return request
    .get(`${etherscanURL}?module=stats&action=ethprice&apikey=${apiKey}`)
    .then((res) => {
      return {
        ethPrice: Number(res.body.result.ethusd).toFixed(2),
        btcPrice: (
          Number(res.body.result.ethusd) / Number(res.body.result.ethbtc)
        ).toFixed(2),
      }
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export function fetchEthSupply() {
  return request
    .get(`${etherscanURL}?module=stats&action=ethsupply2&apikey=${apiKey}`)
    .then((res) => {
      const eth2Supply = Number(res.body.result.EthSupply)
      const eth2Staking = Number(res.body.result.Eth2Staking)
      const burntFees = Number(res.body.result.BurntFees)
      return (eth2Supply + eth2Staking - burntFees) / 1000000000000000000
    })

    .catch((err) => {
      throw new Error(err.message)
    })
}

export function fetchGasPrice() {
  return request
    .get(`${etherscanURL}?module=gastracker&action=gasoracle&apikey=${apiKey}`)
    .then((res) => {
      return {
        low: res.body.result.SafeGasPrice,
        med: res.body.result.ProposeGasPrice,
        high: res.body.result.FastGasPrice,
      }
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

// https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1&interval=daily
