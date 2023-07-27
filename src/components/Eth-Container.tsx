import React, { useEffect } from 'react'
import { Segment, Table, Grid, Label, Popup, Icon } from 'semantic-ui-react'

import { Network, Alchemy } from 'alchemy-sdk'

import { useState } from 'react'

import {
  blocksModel,
  transactionsModel,
  EthContainerProps,
} from '../models/ethModels'

const alchemySettings = {
  apiKey: 'HJw3itzXQn2CBtZSPStaD689a279I1__',
  network: Network.ETH_MAINNET,
}

const alchemy = new Alchemy(alchemySettings)

export default function EthContainer({ ethPrice }: EthContainerProps) {
  const [blocks, setBlocks] = useState([] as blocksModel[])

  const [latestTxs, setLatestTxs] = useState([] as transactionsModel[])

  useEffect(() => {
    alchemy.core.getBlockNumber().then((block) => {
      const fetchBlockPromises = []
      for (let i = 0; i < 5; i++) {
        fetchBlockPromises.push(
          alchemy.core.getBlockWithTransactions(block - i).then((res) => ({
            key: i,
            block: res.number,
            miner: res.miner,
            date: res.timestamp,
            dateStr: new Date(res.timestamp * 1000).toLocaleString(),
            txs: res.transactions.length,
            transactions: res.transactions.map((tx) => ({
              id: tx.hash,
              to: tx.to,
              from: tx.from,
              value: tx.value._hex,
            })),
          }))
        )
      }
      Promise.all(fetchBlockPromises).then((blockData) => {
        const sortedBlocks = blockData.sort((a, b) => a.key - b.key)
        setBlocks(sortedBlocks)
        console.log(sortedBlocks)
        setLatestTxs(sortedBlocks[0].transactions.slice(-5))
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
                        <Popup
                          position="top center"
                          trigger={
                            <p>
                              Miner: {block.miner.slice(0, 6)}...
                              {block.miner.slice(-5)}
                            </p>
                          }
                        >
                          Miner: {block.miner}
                        </Popup>
                        <Popup
                          disabled
                          trigger={<p>Txs: {block.txs}</p>}
                        ></Popup>
                      </Table.Cell>
                      <Table.Cell>
                        <Popup
                          position="top center"
                          trigger={
                            <p>
                              {Math.floor(Date.now() / 1000) - block.date}s ago
                            </p>
                          }
                        >
                          {block.dateStr}
                        </Popup>
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
              <Table.Body>
                {latestTxs.map((tx) => {
                  return (
                    <Table.Row>
                      <Table.Cell>
                        <Label color="grey">Tx</Label>{' '}
                        <Popup
                          position="top center"
                          trigger={
                            <span>
                              {tx.id?.slice(0, 6)}...
                              {tx.id?.slice(-5)}
                            </span>
                          }
                        >
                          Transaction Id: {tx.id}
                        </Popup>
                      </Table.Cell>
                      <Table.Cell>
                        <Popup
                          position="top center"
                          trigger={
                            <p>
                              To: {tx.to?.slice(0, 6)}...{tx.to?.slice(-5)}
                            </p>
                          }
                        >
                          To: {tx.to}
                        </Popup>
                        <Popup
                          position="top center"
                          trigger={
                            <p>
                              From: {tx.from?.slice(0, 6)}...
                              {tx.from?.slice(-5)}
                            </p>
                          }
                        >
                          From: {tx.from}
                        </Popup>
                      </Table.Cell>
                      <Table.Cell>
                        <Icon name="ethereum"></Icon>
                        <Popup
                          position="top center"
                          trigger={
                            <Label color="blue">
                              {parseInt(tx.value, 16) / 10 ** 18 > 0.0001
                                ? (parseInt(tx.value, 16) / 10 ** 18).toFixed(4)
                                : 0}{' '}
                              Eth
                            </Label>
                          }
                        >
                          <p>
                            $
                            {(
                              ethPrice *
                              (parseInt(tx.value, 16) / 10 ** 18)
                            ).toFixed(2)}
                          </p>
                        </Popup>
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}
