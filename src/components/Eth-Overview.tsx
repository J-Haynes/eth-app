import React, { Component, useEffect, useState } from 'react'
import { Card, Grid, Icon } from 'semantic-ui-react'

import { fetchEthPrice } from '../api/clientApi'

export default function EthOverview() {
  useEffect(() => {
    fetchEthPrice().then((price) => setEthPrice(price))
    console.log('hi')
  }, [])

  const [ethPrice, setEthPrice] = useState(0)

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Card>
              <Card.Content>
                <Card.Header style={{ color: '#1d6fa5' }}>
                  <Icon name="ethereum"></Icon> ETHER PRICE
                </Card.Header>
                <Card.Description textAlign="left">
                  <Icon name="usd"></Icon>
                  {ethPrice}
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={4}>
            <Card></Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}
