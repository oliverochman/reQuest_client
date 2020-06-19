import React from "react";
import { List, Button, Card } from "semantic-ui-react";

const OfferMessage = (props) => {
  const helperMessage = (
    <Card.Content>
      <Card.Header></Card.Header>
      <Card.Meta>{props.helperOffer.helper.email}</Card.Meta>
      <Card.Description>{props.helperOffer.message}</Card.Description>
    </Card.Content>
  );
  const showActivityButton = (
    <Card.Content extra>
      <div className="ui two buttons">
        <Button
          basic
          color="green"
          onClick={(e) => props.onClickActivity(e)}
          id="accepted"
        >
          Accept
        </Button>
        <Button
          basic
          color="red"
          onClick={(e) => props.onClickActivity(e)}
          id="declined"
        >
          Decline
        </Button>
      </div>
    </Card.Content>
  );

  return (
    <List divided relaxed id="offers">
      <Card.Group>
        <Card>
          {helperMessage}
          {props.helperOfferStatus === "pending" && showActivityButton}
        </Card>
      </Card.Group>
    </List>
  );
};

export default OfferMessage;
