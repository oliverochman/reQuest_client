import React from "react";
import { List, Button, Card } from "semantic-ui-react";

const OfferMessage = (props) => {
  debugger;
  const helperMessage = (
    <Card.Group>
      <Card>
        <Card.Content>
          <Card.Header>Steve Sanders</Card.Header>
          <Card.Meta>Friends of Elliot</Card.Meta>
          <Card.Description>
            Steve wants to add you to the group <strong>best friends</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green">
              Approve
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
