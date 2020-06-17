import React from "react";
import { Card } from "semantic-ui-react";

const RequestCard = ({ request, activeCard, setActiveCard }) => {
  const id = request.id

  return (
    <Card id={"request-" + id} onClick={() => {activeCard ? setActiveCard(0) : setActiveCard(id)}}>
      <Card.Content>
        <Card.Header>{request.title}</Card.Header>
        <Card.Meta>{request.reward} KP</Card.Meta>
        {activeCard && 
          <Card.Description id={"request-description" + id}>{request.description}</Card.Description>
        }
      </Card.Content>
    </Card>
  );
};

export default RequestCard;
