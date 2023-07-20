import React from 'react'
import { Segment, Grid, Icon, Popup } from 'semantic-ui-react'

export default function Footer() {
  return (
    <Segment basic>
      <Grid columns={2}>
        <Grid.Column>Made by Jack Haynes</Grid.Column>
        <Grid.Column textAlign="right">
          <a href="https://github.com/J-Haynes">
            <Icon name="github" size="big" link color="black"></Icon>
          </a>
          <a href="https://www.linkedin.com/in/jack-haynes-nz/">
            <Icon name="linkedin" size="big" link color="black"></Icon>
          </a>
          <Popup
            content="hey"
            trigger={<Icon name="ethereum" size="big" />}
          ></Popup>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}
