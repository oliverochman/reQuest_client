import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import RequestCard from "./RequestCard";
import { getMyRequests } from "../modules/getRequests";

const MyListComponent = () => {
  const [myRequests, setMyRequests] = useState([]);
  const [activeRequest, setActiveRequest] = useState(false);

  const getList = async () => {
    const requests = await getMyRequests();
    setMyRequests(requests);
  };

  useEffect(() => {
    getList();
  }, []);

  const cards = myRequests.map((request) => (
    <RequestCard key={request.id} request={request} myRequests={true} />
  ));

  return (
    <Card.Group id="my-list" itemsPerRow={1}>
      {cards}
    </Card.Group>
  );
};

export default MyListComponent;
