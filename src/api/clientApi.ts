import request from 'superagent'

const etherscanURL = 'https://api.etherscan.io/api'

const apiKey = 'THWJ7IUUNKYV24EIRNPWQNRCBT1G35CXZD'

export function fetchEthPrice() {
  return request
    .get(`${etherscanURL}?module=stats&action=ethprice&apikey=${apiKey}`)
    .then((res) => res.body.result.ethusd)
}
