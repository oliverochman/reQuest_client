import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequests } from "../modules/getRequests";
import RequestCard from "./RequestCard";
import { Card } from "semantic-ui-react";

const AllRequests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests.requests);
  console.log(requests);

  useEffect(() => {
    getRequests(dispatch);
  }, [dispatch]);

  const requestCards = requests.map((request) => (
    <RequestCard key={request.id} request={request} myRequests={false} />
  ));

  return (
    <>
      <Card.Group id="qcards">{requestCards}</Card.Group>
    </>
  );
};

export default AllRequests;
