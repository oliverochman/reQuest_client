import React from "react";
import { Card, Label } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

const RequestCard = ({ request, setShowMessageForm, setMessage }) => {
  const dispatch = useDispatch();
  const selectedRequest = useSelector(
    (state) => state.requests.selectedRequest
  );
  const onClickHandler = () => {
    if (selectedRequest && selectedRequest.id === request.id) {
      dispatch({ type: "RESET_SELECTED_REQUEST" });
    } else {
      dispatch({
        type: "SET_SELECTED_REQUEST",
        payload: {
          request: request,
        },
      });
    }
    setMessage("");
    setShowMessageForm(false);
  };

  return (
    <>
      <Card color="olive" id={"request-" + request.id} onClick={onClickHandler}>
        <Card.Content>
          <Card.Header>{request.title}</Card.Header>
          <Card.Content>
            <Label color="yellow" ribbon="right">
              {request.reward} p
            </Label>
            {request.distance > 0 && (
              <Card.Meta id="distance">
                Distance: {request.distance} km
              </Card.Meta>
            )}
          </Card.Content>
        </Card.Content>
      </Card>
    </>
  );
};

export default RequestCard;
