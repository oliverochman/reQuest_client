import React from 'react'
import { Grid } from 'semantic-ui-react'
import AllRequests from './AllRequests'
import SpecificRequest from './SpecificRequest'

const BrowseRequests = () => {
  return (
    <>
      <div id="page-container" style={{ padding: "50px", paddingTop: "40px", width: "100vw"}}>
      <h1 style={{position: "absolute", marginTop: "-90px", color: "whitesmoke", fontSize: "300%"}} >Browse reQuests</h1>
        <Grid>
          <Grid.Column width={2}>aa</Grid.Column>
          <Grid.Column width={9}><AllRequests></AllRequests></Grid.Column>
          <Grid.Column width={5}><SpecificRequest /></Grid.Column>
        </Grid>
      </div>
    </>
  )
}

export default BrowseRequests
