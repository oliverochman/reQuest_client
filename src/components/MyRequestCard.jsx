import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import updateRequest from "../modules/updateMyRequest";
import Offers from '../components/Offers'

const MyRequestCard = ({ request, page }) => {
  const activeRequest = useSelector(
    (state) => state.requests.mySelectedRequest
  );
  const myActiveRequest = activeRequest && activeRequest.id === request.id;
  const req = myActiveRequest ? activeRequest : request;
  const dispatch = useDispatch();

  const toggleActiveRequest = async () => {
    if (page === "requests") {
      debugger;
      updateRequest(request, dispatch)

    } else {
      dispatch({ type: "SET_MY_SELECTED_REQUEST", payload: { request } })

    }

  }


  const description = myActiveRequest && (
    <>
      <Card.Description id={"request-description-" + req.id}>
        {req.description}
      </Card.Description>
    </>
  );

  return (
    <Card
      id={"request-" + req.id}
      onClick={() => {
        toggleActiveRequest();
      }}
    >
      <Card.Content>
        <Card.Header>{req.title}</Card.Header>
        {description}
        <Card.Meta>{req.reward} KP</Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default MyRequestCard;
