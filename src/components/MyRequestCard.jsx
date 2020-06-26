import React from "react";
import { Card, Label } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import updateRequest from "../modules/updateMyRequest";

const MyRequestCard = ({ request, page }) => {
  const activeRequest = useSelector(
    (state) => state.requests.mySelectedRequest
  );
  const myActiveRequest = activeRequest && activeRequest.id === request.id;
  const req = myActiveRequest ? activeRequest : request;
  const dispatch = useDispatch();

  const toggleActiveRequest = async () => {
    dispatch({ type: "RESET_MY_SELECTED_REQUEST" });
    if (!myActiveRequest) {
      page === "requests"
        ? updateRequest(request, dispatch)
        : dispatch({ type: "SET_MY_SELECTED_REQUEST", payload: { request } });
    }
  };

  const description = myActiveRequest && (
    <Card.Description id={"request-description-" + req.id}>
      {req.description}
    </Card.Description>
  );

  return (
    <Card
      id={"request-" + req.id}
      color="olive"
      onClick={() => {
        toggleActiveRequest();
      }}
    >
      <Card.Content>
        <Card.Header>{req.title}</Card.Header>
        <Card.Content>
          <Label color="yellow" ribbon="right">
            {req.reward} p
          </Label>
          <div className="description-wrapper">{description}</div>
        </Card.Content>
      </Card.Content>
    </Card>
  );
};

export default MyRequestCard;
