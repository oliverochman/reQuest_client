import React from "react";
import { Button, Divider } from "semantic-ui-react";

export const AboutReQuest = () => {
  return (
    <div id="about-request">
      <div>
        <h3>The big idea - You get what you give</h3>
        <p>
          reQuest is an app for people helping each other with an in-app
          currency (karma points) as reward.
        </p>
        <p>
          So in order to have people help you with reQuests, you need to help
          others with their Quests.
        </p>
        <p>
          You can post a reQuest for a certain task to be done. People can
          respond to reQuests and say that they can do it. You both agree on the
          reward.
        </p>
        <p>
          When the task is done you pay the person that performed the task with
          in-app currency (karma points). Then you can rate each other, so that
          trust-worthy people will get a higher rating.
        </p>
        <p>
          In order to get started , you will need to create an account to post
          and respond to reQuests.
        </p>
      </div>
    </div>
  );
};

export const SelectedRequest = (
  selectedRequest,
  onContactHandler,
  statusMessage,
  disableButton
) => {
  return (
    <div id="selected-request">
      <h2 id="selected-title">{selectedRequest.title}</h2>
      <span id="selected-requester">{selectedRequest.requester}</span>
      <Divider />
      <div id="description-wrapper">
        <p id="selected-description">{selectedRequest.description}</p>
      </div>
      <div id="selected-reward">{selectedRequest.reward}p</div>
      <Button
        id="contact-button"
        disabled={disableButton}
        onClick={onContactHandler}
      >
        contact
      </Button>
      {statusMessage && <span id="selected-message">{statusMessage}</span>}
    </div>
  );
};
