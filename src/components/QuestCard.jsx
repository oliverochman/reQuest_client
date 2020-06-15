import React from "react";
import { Card } from "semantic-ui-react";

const QuestCard = (props) => {
  return (
    <>
      <Card id={"quest-" + props.quest.id}>
        <Card.Content>
          <Card.Header>{props.quest.title}</Card.Header>
          <Card.Meta>{props.quest.kpoints} KP</Card.Meta>
        </Card.Content>
      </Card>
    </>
  );
};

export default QuestCard;
