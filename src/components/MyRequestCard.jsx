import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import updateRequest from "../modules/updateMyRequest";

const MyRequestCard = ({ request }) => {
  const activeRequest = useSelector(
    (state) => state.requests.mySelectedRequest
  );
  const myActiveRequest = activeRequest && activeRequest.id === request.id;
  const req = myActiveRequest ? activeRequest : request;
  const dispatch = useDispatch();
  const [viewDesc, setViewDesc] = useState(false);

  const toggleActiveRequest = async () => {
    if (myActiveRequest) {
      dispatch({ type: "RESET_MY_SELECTED_REQUEST" });
    } else {
      req.status !== "completed" && updateRequest(request, dispatch);
      setViewDesc(!viewDesc);
    }
  };
  const description = viewDesc && (
    <Card.Description id={"request-description-" + req.id}>
      {req.description}
    </Card.Description>
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
        {viewDesc}
      </Card.Content>
    </Card>
  );
};

export default MyRequestCard;
