import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequests } from "../modules/getRequests";
import RequestCard from "./RequestCard";
import { Card, List, Grid } from "semantic-ui-react";
import Axios from "axios"

const AllRequests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests.requests);
  console.log(requests)

  
  useEffect(() => {
    getRequests(dispatch);
  }, [dispatch]);

  const requestCards = requests.map((request) => (
    <RequestCard key={request.id} request={request} myRequests={false}/>
  ));
  
  return (
    <>
    <List id="categories" >
    <List.Item id="home"as='a'>Home</List.Item>
    <List.Item id="education"as='a'>Education</List.Item>
    <List.Item id="it"as='a'>IT</List.Item>
    <List.Item id="vehicles"as='a'>Vehicles</List.Item>
    <List.Item id="others"as='a'>Others</List.Item>
        </List>  
    <Card.Group id="qcards">
      {requestCards}
      </Card.Group>
      </>
  );
};

export default AllRequests;
