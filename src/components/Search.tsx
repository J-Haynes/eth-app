import React, { useState } from 'react'
import { Input, Segment } from 'semantic-ui-react'

export default function SearchBar() {
  const [ethAddress, setEthAddress] = useState('')

  const changeHandler = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setEthAddress(e.target.value)
  }

  return (
    <>
      <Segment raised>
        <Input
          fluid
          icon="ethereum"
          onChange={changeHandler}
          value={ethAddress}
        ></Input>
      </Segment>
    </>
  )
}
