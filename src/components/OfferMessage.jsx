import React from "react";
import { List, Button, Card, Popup } from "semantic-ui-react";

const OfferMessage = (props) => {
  const helperMessage = (
    <Card.Content>
      <Card.Header></Card.Header>
      <Card.Meta>{props.helperOffer.helper.email}</Card.Meta>
      <Card.Description>
        <div style={{height: "35vh"}}></div>
        <Popup 
          content={props.helperOffer.message}
          open
          position="top left"
          trigger={<div></div>}
        />
      </Card.Description>
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
