import React, { useEffect } from 'react'
import { Segment, Button, Table } from 'semantic-ui-react'

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
    <Segment>
      {blocks.map((element) => (
        <p>{element.miner}</p>
      ))}
    </Segment>
  )
}
