import React, { useState } from 'react'
import { Input, Segment, Form } from 'semantic-ui-react'

export default function SearchBar() {
  const [ethAddress, setEthAddress] = useState('')

  const changeHandler = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setEthAddress(e.target.value)
  }

  const submitHandler = () => {
    console.log('urmom')
  }

  return (
    <>
      <Segment raised>
        <Form onSubmit={submitHandler}>
          <Input
            fluid
            icon="search"
            onChange={changeHandler}
            value={ethAddress}
            placeholder="ethereum search..."
            iconPosition="left"
            onSubmit={submitHandler}
          ></Input>
        </Form>
      </Segment>
    </>
  )
}
