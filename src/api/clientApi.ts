import request from 'superagent'

import { blocksModel } from '../models/ethModels'

const etherscanURL = 'https://api.etherscan.io/api'

const apiKey = 'THWJ7IUUNKYV24EIRNPWQNRCBT1G35CXZD'

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

export function fetchEthPrices() {
  return request
    .get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=true&include_24hr_change=true'
    )
    .then((res) => {
      return {
        ethPrice: res.body.ethereum.usd,
        ethPrice24hr: res.body.ethereum.usd_24h_change,
        ethMarketCap: res.body.ethereum.usd_market_cap,
      }
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export function fetchBtcPrice() {
  return request
    .get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&precision=2'
    )
    .then((res) => res.body.bitcoin.usd)
    .catch((err) => {
      throw new Error(err.message)
    })
}

// export function fetchEthRewardBlocks(block: number): blocksModel[] {
//   const blocks = [] as blocksModel[]
//   for (let i = 0; i < 5; i++) {
//     const hexBlock = (block - i).toString(16)
//     request
//       .get(
//         `${etherscanURL}?module=block&action=getblockreward&blockno=${hexBlock}&apikey=${apiKey}`
//       )
//       .then((res) => {
//         blocks.push({
//           block: block - i,
//           miner: Number(res.body.result.miner),
//           size: parseInt(res.body.result.size, 16),
//           date: parseInt(res.body.result.timestamp, 16),
//           txs: res.body.result.transactions.length,
//         })
//       })
//   }
//   return blocks
// }

export function fetchEthRewardBlocks(block: number): Promise<blocksModel[]> {
  const blocksPromises: Promise<blocksModel>[] = []

  for (let i = 0; i < 3; i++) {
    setTimeout(() => {}, 500)
    const theBlock = block - i
    const hexBlock = theBlock.toString(16)
    const requestPromise = request
      .get(
        `${etherscanURL}?module=proxy&action=eth_getBlockByNumber&tag=${hexBlock}&boolean=true&apikey=${apiKey}`
      )
      .then((res) => ({
        key: i,
        block: block - i,
        miner: res.body.result.miner,
        size: res.body.result.size,
        date: res.body.result.timestamp,
        txs: res.body.result.transactions.length,
      }))
      .catch((err) => {
        throw new Error(err.message)
      })
    blocksPromises.push(requestPromise)
  }
  return Promise.all(blocksPromises)
}

const myObj = [
  {
    key: 0,
    block: 17769280,
    miner: '0xdafea492d9c6733ae3d56b7ed1adb60692c98bc5',
    size: '0x21075',
    date: '0x64bf9887',
  },

  {
    key: 1,
    block: 17769279,
    miner: '0x4838b106fce9647bdf1e7877bf73ce8b0bad5f97',
    size: '0x70124',
    date: '0x64bf987b',
  },

  {
    key: 2,
    block: 17769278,
    miner: '0xbaf6dc2e647aeb6f510f9e318856a1bcd66c5e19',
    size: '0x1e5da',
    date: '0x64bf986f',
  },
]
