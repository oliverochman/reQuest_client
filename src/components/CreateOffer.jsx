import React from "react";
import { Button } from "semantic-ui-react";

const CreateOffer = (props) => {
  return (
    <div id="specific-component">
      <div id="message-container">
        <h3 className="createOffer-label">{"Your message:"}</h3>
        <form id="send-message-form" onSubmit={(e) => props.createOffer(e)}>
          <textarea
            id="offerMessage"
            name="OfferMessage"
            placeholder="Write your message here..."
            required
          />
          <Button id="message-send-btn" type="submit">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateOffer;
