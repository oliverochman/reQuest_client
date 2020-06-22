import React, { useState } from "react";
import { Grid, List } from "semantic-ui-react";
import AllRequests from "./AllRequests";
import SpecificRequest from "./SpecificRequest";

const BrowseRequests = () => {
  const [category, setCategory] = useState("");
  const onItemClickHandler = (e) => {
    setCategory(e.target.id);
  };

  return (
    <>
      <div id="page-container">
        <h1 id="browse-title">Browse reQuests</h1>
        <List id="categories" onClick={(e) => onItemClickHandler(e)}>
          <List.Item id="all">All</List.Item>
          <List.Item id="home">Home</List.Item>
          <List.Item id="education" as="a">
            Education
          </List.Item>
          <List.Item id="it" as="a">
            IT
          </List.Item>
          <List.Item id="vehicles" as="a">
            Vehicles
          </List.Item>
          <List.Item id="others" as="a">
            Others
          </List.Item>
        </List>
        <Grid>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={9} id="list-wrapper">
            <AllRequests category={category} />
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
