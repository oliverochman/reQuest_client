import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import MyRequestCard from "./MyRequestCard";
import { getMyRequests, getMyQuests } from "../modules/getRequests";

const MyListComponent = ({ selectedStatus, page }) => {
  const [myRequests, setMyRequests] = useState([]);
  
  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    getList();
  }, [page, selectedStatus]);

  const getList = async () => {
    const response = page === "requests" ? await getMyRequests() : await getMyQuests();
    debugger

    setMyRequests(response)
    // if ('requests' in response) {
    //   setMyRequests(response.requests);
    // } else {
    //   setMyQuests(response.quests)
    // }
  };

  const requestsFilteredByStatus = myRequests.filter((request) => (
    request.status === selectedStatus
  ))

  const cards = requestsFilteredByStatus.map((request) => (
    <MyRequestCard key={request.id} request={request} page={page} />
  ));

  const message = cards.length === 0 &&
   <h4 id="no-requests-message">You have no {selectedStatus} {page} to show!</h4>

  return (
    <Card.Group id="my-list" itemsPerRow={1}>
      {message}
      {cards}
    </Card.Group>
  );
};

export default MyListComponent;
