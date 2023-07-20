import React from 'react'

import { Header, Segment } from 'semantic-ui-react'

import './header.css'

export default function EthHeader() {
  return (
    <Segment padded raised>
      <Header textAlign="center" as="h1">
        Eth-App
      </Header>
    </Segment>
  )
}
