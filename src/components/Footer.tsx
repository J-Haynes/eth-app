import React from 'react'
import { Segment, Grid, Icon, Popup } from 'semantic-ui-react'

export default function Footer() {
  return (
    <Segment basic>
      <Grid columns={2}>
        <Grid.Column>Made by Jack Haynes</Grid.Column>
        <Grid.Column textAlign="right">
          <a
            href="https://github.com/J-Haynes"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="github" size="big" link color="black"></Icon>
          </a>
          <a
            href="https://www.linkedin.com/in/jack-haynes-nz/"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="linkedin" size="big" link color="black"></Icon>
          </a>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}
