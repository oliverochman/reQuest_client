import React from 'react'
import { Grid } from 'semantic-ui-react'
import AllRequests from './AllRequests'
import SpecificRequest from './SpecificRequest'

const BrowseRequests = () => {
  return (
    <div style={{ padding: "50px", paddingTop: "80px", width: "100vw"}}>
      <Grid>
        <Grid.Column width={3}>A</Grid.Column>
        <Grid.Column width={9}><AllRequests></AllRequests></Grid.Column>
        <Grid.Column width={4}><SpecificRequest /></Grid.Column>
      </Grid>
    </div>
  )
}

export default BrowseRequests
