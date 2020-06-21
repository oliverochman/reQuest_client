import React from "react";
import { List, Button, Card, Popup } from "semantic-ui-react";

const OfferMessage = (props) => {
  const helperMessage = (
    <Card.Content>
      <Card.Header></Card.Header>
      <Card.Meta>{props.helperOffer.email}</Card.Meta>
      <Card.Description>
        <div style={{ height: "35vh" }}></div>
        <Popup
          content={props.helperOffer.message}
          open
          position="top left"
          id="offer-message"
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
          value={props.id}
        >
          Accept
        </Button>
        <Button
          basic
          color="red"
          onClick={(e) => props.onClickActivity(e)}
          id="declined"
          value={props.id}
        >
          Decline
        </Button>
      </div>
    </Card.Content>
  );

  return (
    <>
      <List divided relaxed id="offers">
        <Card.Group>
          <Card>
            {helperMessage}
            {props.helperOffer.status === "pending" && showActivityButton}
          </Card>
        </Card.Group>
      </List>
      <div id="rightmost-component">
        <Button id="quest-completed">Quest Completed</Button>
      </div>
    </>
  );
};

export default OfferMessage;
