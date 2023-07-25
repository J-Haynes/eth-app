export interface fetchEthPriceModel {
  ethPrice: number
  btcPrice: number
}

export interface blocksModel {
  key: number
  block: number
  miner: string
  size: string
  date: string
  txs: number
  transactions: string[]
}

export interface transactionsModel {
  key: number
  id: string | undefined
  to: string | undefined
  from: string | undefined
  value: string | undefined
}
