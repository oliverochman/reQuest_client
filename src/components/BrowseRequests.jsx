import React from "react";
import { Grid, List } from "semantic-ui-react";
import AllRequests from "./AllRequests";
import SpecificRequest from "./SpecificRequest";

const BrowseRequests = () => {
  return (
    <>
      <div id="page-container">
        <h1 id="browse-title">Browse reQuests</h1>
        <List >
          <List.Item id="Home">Home</List.Item>
          <List.Item id="Education">Education</List.Item>
          <List.Item>IT</List.Item>
          <List.Item>Vehicles</List.Item>
          <List.Item>Others</List.Item>
        </List>
        <Grid>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={9} id="list-wrapper">
            <AllRequests />
          </Grid.Column>
          <Grid.Column width={5}>
            <SpecificRequest />
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
};

export default BrowseRequests;
