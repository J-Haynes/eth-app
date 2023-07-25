import React, { useEffect } from 'react'
import { Segment, Table, Grid, Label } from 'semantic-ui-react'

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
        console.log(res)
        setBlocks(res)
      })
    })
  }, [])

  return (
    <Segment vertical>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Cell>
                    <h3>Latest Blocks</h3>
                  </Table.Cell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {blocks.map((block) => {
                  return (
                    <Table.Row key={block.key}>
                      <Table.Cell>
                        <Label color="grey">Block</Label> {block.block}
                      </Table.Cell>
                      <Table.Cell>
                        Miner {block.miner.slice(0, 4)}...
                        {block.miner.slice(-5)}
                        <br />
                        Txs: {block.txs}
                      </Table.Cell>
                      <Table.Cell>
                        <Label color="grey">Size</Label>{' '}
                        {(parseInt(block.size, 16) / 1024).toFixed(1)} kilobytes
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Cell>
                    <h3>Latest Transactions</h3>
                  </Table.Cell>
                </Table.Row>
              </Table.Header>
              <Table.Header></Table.Header>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}
