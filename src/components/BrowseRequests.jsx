import React from "react";
import { Grid, List } from "semantic-ui-react";
import AllRequests from "./AllRequests";
import SpecificRequest from "./SpecificRequest";
import { useDispatch } from "react-redux";

const BrowseRequests = () => {
  const dispatch = useDispatch();
  const onItemClickHandler = (e) => {
    dispatch({
      type: "SET_ACTIVE_CATEGORY",
      payload: {
        activeCategory: e.target.id,
      },
    });
  };

  return (
    <>
      <div id="page-container">
        <h2 id="browse-title">Categories</h2>
        <List id="categories" onClick={(e) => onItemClickHandler(e)}>
          <List.Item id="all" active='true'>All</List.Item>
          <List.Item id="home">Home</List.Item>
          <List.Item id="education">Education</List.Item>
          <List.Item id="it">IT</List.Item>
          <List.Item id="vehicles">Vehicles</List.Item>
          <List.Item id="other">Others</List.Item>
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
