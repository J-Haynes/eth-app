import React, { useEffect, useState } from 'react'
import { Card, Grid, Icon, Segment, Popup } from 'semantic-ui-react'

import {
  fetchEthPrices,
  fetchEthSupply,
  fetchGasPrice,
  fetchBtcPrice,
} from '../api/clientApi'

export default function EthOverview({
  setEthPrice,
}: {
  setEthPrice: React.Dispatch<React.SetStateAction<number>>
}) {
  const [ethPrices, setEthPrices] = useState({
    ethPrice: 0,
    ethPrice24hr: 0,
    ethMarketCap: 0,
  })

  const [ethSupply, setEthSupply] = useState(0)
  const [gasPrice, setGasPrice] = useState({
    low: 0,
    med: 0,
    high: 0,
  })

  const [btcPrice, setBtcPrice] = useState(0)

  useEffect(() => {
    fetchEthPrices().then((res) => {
      setEthPrices(res)
      setEthPrice(res.ethPrice)
    })
    fetchEthSupply().then((res) => setEthSupply(res))
    fetchGasPrice().then((res) => setGasPrice(res))
    fetchBtcPrice().then((res) => setBtcPrice(res))
  }, [])

  return (
    <Segment padded raised>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Card>
              <Card.Content>
                <Card.Header style={{ color: '#1b1c1d' }}>
                  <Icon name="ethereum"></Icon> Ethereum:
                </Card.Header>
                <Card.Description textAlign="left">
                  <Icon name="usd"></Icon>
                  {ethPrices.ethPrice.toFixed(2)}
                  {ethPrices.ethPrice24hr >= 0 ? (
                    <>
                      <Icon name="angle up"></Icon>
                      <Icon name="usd" size="small" color="green" />
                      <span>{ethPrices.ethPrice24hr.toFixed(2)}</span>
                    </>
                  ) : (
                    <>
                      <Icon name="angle down"></Icon>
                      <Icon name="usd" size="small" color="red" />
                      <span>{ethPrices.ethPrice24hr.toFixed(2)}</span>
                    </>
                  )}
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={4}>
            <Card>
              <Card.Content>
                <Card.Header style={{ color: '#1b1c1d' }}>
                  <Icon name="ethereum"></Icon> Eth Supply:
                </Card.Header>
                <Card.Description textAlign="left">
                  {(ethSupply / 1000000).toPrecision(5)} M
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={4}>
            <Popup
              position="bottom center"
              trigger={
                <Card>
                  <Card.Content>
                    <Card.Header style={{ color: '#1b1c1d' }}>
                      <Icon name="ethereum"></Icon> Gas Price:
                    </Card.Header>
                    <Card.Description textAlign="left">
                      {gasPrice.med} gwei
                    </Card.Description>
                  </Card.Content>
                </Card>
              }
            >
              <p>Slow fee: {gasPrice.low} gwei</p>
              <p>Median fee: {gasPrice.med} gwei</p>
              <p>Fast fee: {gasPrice.high} gwei</p>
            </Popup>
          </Grid.Column>
          <Grid.Column width={4}>
            <Card>
              <Card.Content>
                <Card.Header style={{ color: '#1b1c1d' }}>
                  <Icon name="bitcoin"></Icon> Bitcoin:
                </Card.Header>
                <Card.Description textAlign="left">
                  <Icon name="usd"></Icon>
                  {btcPrice}
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}
