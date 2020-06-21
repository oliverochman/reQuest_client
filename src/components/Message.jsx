import React from "react";
import { Form, Container, Input } from "semantic-ui-react";

const Message = () => {
  const createOffer = () => {
    console.log("post");
  };

  return (
    <div id="specific-component">
      <div id="message-container">
        <h3 className="input-labels">{"Your message"}</h3>
        <form id="send-message-form" onSubmit={createOffer}>
          <input
            id="message-input"
            name="message"
            placeholder="Write your message here..."
            type="textarea"
            required
          />
          <button id="send-btn" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;
