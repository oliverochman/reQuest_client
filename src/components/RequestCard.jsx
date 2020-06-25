import React from "react";
import { Card } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

const RequestCard = ({ request }) => {
  const dispatch = useDispatch();
  const selectedRequest = useSelector(
    (state) => state.requests.selectedRequest
  );
  const onClickHandler = () => {
    if (selectedRequest && selectedRequest.id === request.id) {
      dispatch({ type: "RESET_SELECTED_REQUEST" })
    } else {
      dispatch({
        type: "SET_SELECTED_REQUEST",
        payload: {
          request: request,
        },
      });
    }
  };

  return (
    <>
      <Card
        style={{ margin: "10px" }}
        color="olive"
        id={"request-" + request.id}
        onClick={onClickHandler}
      >
        <Card.Content>
          <Card.Header>{request.title}</Card.Header>
          <Card.Meta>{request.reward} KP</Card.Meta>
          {request.distance && (
            <Card.Meta id="distance">Distance: {request.distance} km</Card.Meta>
          )}
        </Card.Content>
      </Card>
    </>
  );
};

export default RequestCard;
