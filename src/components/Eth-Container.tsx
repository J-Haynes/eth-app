import React, { useEffect } from 'react'
import { Segment, Button, Table, Grid, TableHeader } from 'semantic-ui-react'

import { Network, Alchemy } from 'alchemy-sdk'

import { useState } from 'react'

import { fetchEthRewardBlocks } from '../api/clientApi'
import { blocksModel } from '../models/ethModels'

const alchemySettings = {
  apiKey: 'HJw3itzXQn2CBtZSPStaD689a279I1__',
  network: Network.ETH_MAINNET,
}

const alchemy = new Alchemy(alchemySettings)

export default function EthContainer() {
  const [blocks, setBlocks] = useState([] as blocksModel[])

  useEffect(() => {
    alchemy.core.getBlockNumber().then((block) => {
      console.log(block)
      fetchEthRewardBlocks(block).then((res: blocksModel[]) => {
        setBlocks(res)
      })
    })
  }, [])

  return (
    <Segment vertical>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Table inverted>
              <Table.Header>
                <Table.Row>
                  <Table.Cell>
                    <h3>Latest Blocks</h3>
                  </Table.Cell>
                </Table.Row>
              </Table.Header>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <Table inverted>
              <Table.Header>
                <Table.Row>
                  <Table.Cell>
                    <h3>Latest Blocks</h3>
                  </Table.Cell>
                </Table.Row>
              </Table.Header>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}
