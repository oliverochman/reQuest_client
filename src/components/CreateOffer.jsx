import React from "react";
import { Button, Form, TextArea, Divider } from "semantic-ui-react";

export const CreateOffer = (props) => {
  return (
    <div id="message-component-send">
      <Divider />
      <h3 className="createOffer-label">{"Your message:"}</h3>
      <Form id="send-message-form" onSubmit={(e) => props.createOffer(e)}>
        <TextArea
          id="message-text"
          name="OfferMessage"
          placeholder="Write your message here..."
          required
        />
        <Button id="message-send-btn" type="submit">
          Send
        </Button>
      </Form>
    </div>
  );
};
