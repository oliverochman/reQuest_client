import React from "react";
import { Card } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleRequest } from "../modules/getRequests";

const RequestCard = ({ request, myRequests }) => {
  const activeRequest = useSelector((state) => state.requests.activeRequest);
  const myActiveRequest = activeRequest && activeRequest.id === request.id;
  const req = myActiveRequest ? activeRequest : request;
  const dispatch = useDispatch();

  const toggleActiveRequest = () => {
    myActiveRequest
      ? dispatch({ type: "RESET_ACTIVE_REQUEST" })
      : getSingleRequest(dispatch, req.id);
  };

  return (
    <Card
      id={"request-" + req.id}
      onClick={() => {
        toggleActiveRequest();
      }}
    >
      <Card.Content>
        <Card.Header>{req.title}</Card.Header>
        <Card.Meta>{req.reward} KP</Card.Meta>
        {myActiveRequest && (
          <Card.Description id={"request-description-" + req.id}>
            {req.description}
          </Card.Description>
        )}
      </Card.Content>
    </Card>
  );
};

export default RequestCard;
