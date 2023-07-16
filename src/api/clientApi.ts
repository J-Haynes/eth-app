import request from 'superagent'
import { fetchEthPriceModel } from '../models/ethModels'

const etherscanURL = 'https://api.etherscan.io/api'

const apiKey = 'THWJ7IUUNKYV24EIRNPWQNRCBT1G35CXZD'

export function fetchEthPrice() {
  return request
    .get(`${etherscanURL}?module=stats&action=ethprice&apikey=${apiKey}`)
    .then((res) => {
      return {
        ethPrice: Number(res.body.result.ethusd),
        btcPrice:
          Number(res.body.result.ethusd) / Number(res.body.result.ethbtc),
      }
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}
