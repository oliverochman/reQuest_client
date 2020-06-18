import React from "react";
import { List, Button, Card } from "semantic-ui-react";

const OfferMessage = (props) => {
  // debugger;
  const helperMessage = (
    <Card.Group>
      <Card>
        <Card.Content>
          <Card.Header></Card.Header>
          <Card.Meta>{props.activeOffer.helper.email}</Card.Meta>
          <Card.Description>{props.activeOffer.message}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green">
              Accept
            </Button>
            <Button basic color="red">
              Decline
            </Button>
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
  );

  return (
    <List divided relaxed id="offers">
      {helperMessage}
    </List>
  );
};

export default OfferMessage;
