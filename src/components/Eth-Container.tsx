import React, { useEffect } from 'react'
import { Segment, Table, Grid, Label, Popup } from 'semantic-ui-react'

import { Network, Alchemy } from 'alchemy-sdk'

import { useState } from 'react'

import { fetchEthRewardBlocks } from '../api/clientApi'
import { blocksModel, transactionsModel } from '../models/ethModels'

const alchemySettings = {
  apiKey: 'HJw3itzXQn2CBtZSPStaD689a279I1__',
  network: Network.ETH_MAINNET,
}

const alchemy = new Alchemy(alchemySettings)

export default function EthContainer() {
  const [blocks, setBlocks] = useState([] as blocksModel[])

  // const [transactions, setTransactions] = useState([] as transactionsModel[])

  // useEffect(() => {
  //   alchemy.core.getBlockNumber().then((block) => {
  //     fetchEthRewardBlocks(block).then((res: blocksModel[]) => {
  //       console.log('blocks array', res)
  //       setBlocks(res)
  //     })
  //     const transactionsArray: React.SetStateAction<transactionsModel[]> = []
  //     for (let i = 0; i < 3; i++) {
  //       console.log('hi')
  //       alchemy.core.getTransaction(blocks[0].transactions[i]).then((res) => {
  //         transactionsArray.push({
  //           key: i,
  //           id: res?.hash,
  //           to: res?.to,
  //           from: res?.from,
  //           value: res?.value._hex,
  //         })
  //       })
  //     }
  //     setTransactions(transactionsArray)
  //     console.log('transactions array', transactions)
  //   })
  // }, [])

  const [transactions, setTransactions] = useState([] as transactionsModel[])

  const txsArray = [] as transactionsModel[]

  useEffect(() => {
    alchemy.core.getBlockNumber().then((block) => {
      fetchEthRewardBlocks(block).then((res: blocksModel[]) => {
        setBlocks(res)
      })
      alchemy.core
        .getBlockWithTransactions(block)
        .then((res) => console.log('blockwitsstuff', res))
    })

    // use coingecko/etherscan for prices and supply
    // use alchemy to rewrite block data, much better api rules (12M/month)
    // expand to view 6 blocks/txs

    // for (let i = 0; i < 3; i++) {
    //   alchemy.core.getTransaction(blocks[0].transactions[i]).then((res) =>
    //     transactions.push({
    //       key: i,
    //       id: res?.hash,
    //       to: res?.to,
    //       from: res?.from,
    //       value: res?.value._hex,
    //     })
    //   )
    // }
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
                              Miner {block.miner.slice(0, 4)}...
                              {block.miner.slice(-5)}
                            </p>
                          }
                        >
                          Miner: {block.miner}
                        </Popup>
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
              <Table.Body>
                {transactions.map((tx) => {
                  return (
                    <Table.Row>
                      <Table.Cell>
                        <Label color="grey">Tx</Label>
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
