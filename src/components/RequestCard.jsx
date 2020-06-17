import React from "react";
import { Card } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleRequest } from "../modules/getRequests"
import Offers from "./Offers"

const RequestCard = ({ request }) => {
  const activeCard = useSelector((state) => state.requests.activeRequest);
  const active = activeCard && activeCard.id === request.id;
  const req = active ? activeCard : request;
  const dispatch = useDispatch()

  return (
    <>
      <Card
        id={"request-" + req.id}
        onClick={() => {
          getSingleRequest(dispatch, req.id);
        }}
      >
        <Card.Content>
          <Card.Header>{req.title}</Card.Header>
          <Card.Meta>{req.reward} KP</Card.Meta>
          {active && (
            <Card.Description id={"request-description-" + req.id}>
              {req.description}
            </Card.Description>
          )}
        </Card.Content>
      </Card>
      {active &&
        <Offers 
          request={activeCard}
        />
      }
    </>
  );
};

export default RequestCard;
