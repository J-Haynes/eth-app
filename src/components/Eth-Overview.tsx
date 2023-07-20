import React, { Component, useEffect, useState } from 'react'
import { Card, Grid, Icon, Segment, Popup } from 'semantic-ui-react'

import { fetchEthPrice, fetchEthSupply, fetchGasPrice } from '../api/clientApi'

export default function EthOverview() {
  const [prices, setPrices] = useState({
    ethPrice: '0.0',
    btcPrice: '0.0',
  })

  const [ethSupply, setEthSupply] = useState(0)
  const [gasPrice, setGasPrice] = useState({
    low: 0,
    med: 0,
    high: 0,
  })

  useEffect(() => {
    fetchEthPrice().then((res) => setPrices(res))
    fetchEthSupply().then((res) => setEthSupply(res))
    fetchGasPrice().then((res) => {
      console.log(res)
      setGasPrice(res)
    })
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
                  {prices.ethPrice}
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
                  {prices.btcPrice}
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}
