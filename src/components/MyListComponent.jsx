import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import MyRequestCard from "./MyRequestCard";
import { getMyRequests, getMyQuests } from "../modules/getRequests";
import { useDispatch, useSelector } from "react-redux";

const MyListComponent = ({ selectedStatus, page }) => {
  const [myRequests, setMyRequests] = useState([]);
  const fetchMyRequests = useSelector((state) => state.requests.getMyRequests);
  const dispatch = useDispatch();

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    getList();
  }, [selectedStatus, page]);

  useEffect(() => {
    if (fetchMyRequests) {
      getList();
    }
  }, [fetchMyRequests]);

  const getList = async () => {
    const response =
      page === "requests" ? await getMyRequests() : await getMyQuests();
    setMyRequests(response);
    dispatch({ type: "FETCH_MY_REQUESTS", payload: { getMyRequests: false } });
  };

  const requestsFilteredByStatus = myRequests.filter(
    (request) => request.status === selectedStatus
  );

  const cards = requestsFilteredByStatus.map((request) => (
    <MyRequestCard key={request.id} request={request} page={page} />
  ));

  const message = cards.length === 0 && (
    <h4 id="no-requests-message">
      You have no {selectedStatus} {page} to show!
    </h4>
  );

  return (
    <Card.Group id="my-list" itemsPerRow={1}>
      {message}
      {cards}
    </Card.Group>
  );
};

export default MyListComponent;
