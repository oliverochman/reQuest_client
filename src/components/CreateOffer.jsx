import React from "react";

const CreateOffer = (props) => {
  return (
    <div id="specific-component">
      <div id="message-container">
        <h3 className="input-labels">{"Your message:"}</h3>
        <form id="send-message-form" onSubmit={(e) => props.createOffer(e)}>
          <textarea
            id="offerMessage"
            name="OfferMessage"
            placeholder="Write your message here..."
            required
          />
          <button id="message-send-btn" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOffer;
