import React, { useState } from "react";
import { List, Button, Card, Popup } from "semantic-ui-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ReplyOffer } from "./CreateOffer";
import createHeaders from "../modules/headers";

const OfferMessage = (props) => {
  
  const [replyStatus, setReplyStatus] = useState(false);
  

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
      <>
        {props.selectedStatus === "pending" && (
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
        )}
        {props.selectedStatus === "active" && (!completedMessage || error) && (
          <div className="ui two buttons">
            <Button
              id="quest-reply"
              onClick={() => setReplyStatus(!replyStatus)}
            >
              Reply
            </Button>
            <Button id="quest-completed" onClick={props.completeRequest}>
              Quest Completed
            </Button>
          </div>
        )}
      </>
    </Card.Content>
  );

  return (
    <>
      <List divided relaxed id="offers">
        <Card.Group>
          <Card>
            {helperMessage}
            {showActivityButton}
          </Card>
        </Card.Group>
        <p style={{ color: "black" }} id="completed-message">
          {completedMessage}
        </p>
        {replyStatus && (
          <ReplyOffer replyOfferMessage={props.replyOfferMessage} />
        )}
      </List>
    </>
  );
};

export default OfferMessage;
