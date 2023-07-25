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
}
