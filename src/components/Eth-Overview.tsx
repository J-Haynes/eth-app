import React, { Component, useEffect, useState } from 'react'
import { Card, Grid, Icon } from 'semantic-ui-react'

import { fetchEthPrice } from '../api/clientApi'

import { fetchEthPriceModel } from '../models/ethModels'

export default function EthOverview() {
  const [prices, setPrices] = useState({
    ethPrice: 0,
    btcPrice: 0,
  })

  useEffect(() => {
    fetchEthPrice().then((res) => setPrices(res))
    console.log('hi')
  }, [])

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Card>
              <Card.Content>
                <Card.Header style={{ color: '#1d6fa5' }}>
                  <Icon name="ethereum"></Icon> ETH Price
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
                <Card.Header style={{ color: '#1d6fa5' }}>
                  <Icon name="bitcoin"></Icon> BTC Price:
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
    </div>
  )
}
