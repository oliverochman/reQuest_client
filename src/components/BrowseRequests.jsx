import React from 'react'
import { Grid } from 'semantic-ui-react'
import AllRequests from './AllRequests'
import SpecificRequest from './SpecificRequest'

const BrowseRequests = () => {
  return (
    <div stretched style={{ padding: "50px", paddingTop: "120px", width: "100vw"}}>
      <Grid>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={9}><AllRequests></AllRequests></Grid.Column>
        <Grid.Column width={5}><SpecificRequest /></Grid.Column>
      </Grid>
    </div>
  )
}

export default BrowseRequests
