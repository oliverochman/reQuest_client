import React from 'react'
import { Grid } from 'semantic-ui-react'
import AllRequests from './AllRequests'
import SpecificRequest from './SpecificRequest'

const BrowseRequests = () => {
  return (
    <>
      <div id="page-container" style={{ padding: "50px", paddingTop: "20px", width: "100vw"}}>
      <h1 style={{position: "absolute", marginTop: "-80px", color: "whitesmoke", fontSize: "300%"}} >Browse reQuests</h1>
        <Grid style={{width: "100%"}}>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={9}><AllRequests /></Grid.Column>
          <Grid.Column width={5}><SpecificRequest /></Grid.Column>
        </Grid>
      </div>
    </>
  )
}

export default BrowseRequests
