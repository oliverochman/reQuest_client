import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import MyRequestCard from "./MyRequestCard";
import { getMyRequests } from "../modules/getRequests";

const MyListComponent = () => {
  const [myRequests, setMyRequests] = useState([]);

  const getList = async () => {
    const requests = await getMyRequests();
    setMyRequests(requests);
  };

  useEffect(() => {
    getList();
  }, []);

  const cards = myRequests.map((request) => (
    <MyRequestCard key={request.id} request={request} />
  ));

  return (
    <Card.Group id="my-list" itemsPerRow={1}>
      {cards}
    </Card.Group>
  );
};

export default MyListComponent;
