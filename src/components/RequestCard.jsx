import React from "react";
import { Card } from "semantic-ui-react";

const QuestCard = ({ request }) => {
  return (
    <>
      <Card style={{ margin: "10px" }} id={"request-" + request.id}>
        <Card.Content>
          <Card.Header>{request.title}</Card.Header>
          <Card.Meta>{request.reward} KP</Card.Meta>
        </Card.Content>
      </Card>
    </>
  );
};

export default QuestCard;
