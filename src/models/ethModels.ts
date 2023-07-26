export interface fetchEthPriceModel {
  ethPrice: number
  btcPrice: number
}

export interface blocksModel {
  key: number
  block: number
  miner: string
  date: number
  txs: number
  transactions: transactionsModel[]
}

export interface transactionsModel {
  id: string | undefined
  to: string | undefined
  from: string | undefined
  value: string
}
