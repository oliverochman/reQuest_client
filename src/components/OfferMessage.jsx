import React, { useState } from "react";
import { List, Button, Card, Popup } from "semantic-ui-react";
import axios from 'axios';

const OfferMessage = (props) => {
  const [completedMessage, setCompletedMessage] = useState("");

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

      const completeRequest = async () => {
      try {
        const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
        const response = await axios.put(
          `/my_requests/requests/${props.request.id}`,
          { headers: headers },
          { params: { activity: "completed" } }
        );
        debugger
        setCompletedMessage(response.data.message);
      } catch (error) {
        debugger
        setCompletedMessage(error.response.data.message);
      }
    };


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
        <Button id="quest-completed" onClick={completeRequest}>Quest Completed</Button>
        <p id="completed-message">{completedMessage}</p>
      </div>
    </>
  );
};

export default OfferMessage;
