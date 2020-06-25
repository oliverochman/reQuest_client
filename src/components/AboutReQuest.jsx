import React from "react";
import { Button, Divider, Popup } from "semantic-ui-react";

export const AboutReQuest = () => {
  return (
    <div id="about-request" className="description-wrapper">
      <h3 id="about-title">The big idea</h3> <br />{" "}
      <h3 id="about-byline">You get what you give</h3>
      <p id="about-body">
        reQuest is an app for people helping each other with an in-app currency
        (karma points) as reward. <br /> <br />
        So in order to have people help you with reQuests, you need to help
        others with their reQuests, which becomes your Quests.
        <br /> <br />
        You can post a reQuest for a certain task to be done. People can respond
        to reQuests and say that they can do it. You both agree on the reward.{" "}
        <br /> <br />
        When the task is done you pay the person that performed the task with
        in-app currency (karma points). Then you can rate each other, so that
        trust-worthy people will get a higher rating. <br /> <br />
        In order to get started, you will need to create an account to post and
        respond to reQuests. <br />
      </p>
    </div>
  );
};

export const SelectedRequest = (props) => {
  return (
    <div id="selected-request">
      <h3 id="selected-title">{props.selectedRequest.title}</h3>
      <h5 id="selected-requester">{props.selectedRequest.requester}</h5>
      <Divider />
      <div className="reward">{props.selectedRequest.reward}p</div>
      <div className="description-wrapper">
        <p id="selected-description">{props.selectedRequest.description}</p>
      </div>
      {!props.showMessageForm &&
        props.message === "" &&
        (!props.disableButton ? (
          <Button id="contact-button" onClick={props.onContactHandler}>
            contact
          </Button>
        ) : (
          <Popup
            id="selected-message"
            content={props.statusMessage}
            hoverable
            inverted
            position="top left"
            trigger={<Button id="disabled-contact-button">contact</Button>}
          />
        ))}
    </div>
  );
};
