import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import OfferMessage from "./OfferMessage";
import OfferList from "./OfferList";

import updateMyRequest from "../modules/updateMyRequest";
import { useDispatch } from "react-redux";
import {
  updateOffer,
  updateRequest,
  createReplyMessages,
} from "../modules/messaging";

const Offers = ({ request, selectedStatus }) => {
  const dispatch = useDispatch();
  const [showHelperMessage, setShowHelperMessage] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [helperOffer, setHelperOffer] = useState({});
  const [completedMessage, setCompletedMessage] = useState("");
  const [error, setError] = useState(false);

  const onHelperClick = (e) => {
    setShowHelperMessage(true);
    setHelperOffer({ ...request.offers[parseInt(e.target.id)] });
  };

  const onClickActivity = async (e) => {
    const response = await updateOffer(e.target.id, helperOffer.id);
    setStatusMessage(response.data.message);
    await updateMyRequest(request, dispatch);
  };

  const completeRequest = async () => {
    const response = await updateRequest(request.id);
    if (response) {
      setCompletedMessage(response.data.message);
      setError(false);
    } else {
      setCompletedMessage(error.response.data.message);
      setError(true);
    }
  };

  const replyOfferMessage = async (e) => {
    const message = e.target.replyMessage.value;
    const resp = await createReplyMessages(request.id, message);
    // THIS LINE BELOW IS ONLY TEMPORARY SINCE IT CHANGES THE STATE LOCALLY WITHOUT RESPONSE FROM BACKEND
    acceptedHelperOffer.conversation.messages.push({
      me: true,
      content: message,
    });
    resp.data.message.me !== true && setStatusMessage("Message not sent");
  };

  const myOffers = request.offers.map((offer, index) => (
    <OfferList
      offer={offer}
      requestStatus={request.status}
      index={index}
      onHelperClick={onHelperClick}
    />
  ));

  const acceptedHelperOffer = request.offers.filter(
    (offer) => offer.status === "accepted"
  )[0];

  const myOffersActiveComp = (selectedStatus === "active" ||
    selectedStatus === "completed") && (
    <OfferMessage
      helperOffer={acceptedHelperOffer}
      selectedStatus={selectedStatus}
      completeRequest={completeRequest}
      replyOfferMessage={replyOfferMessage}
      completedMessage={completedMessage}
      error={error}
    />
  );

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {selectedStatus === "pending" && (
        <>
          <List divided relaxed id="offers">
            <h3>Offers</h3>
            {myOffers}
          </List>
          <div
            style={{
              marginLeft: "30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {showHelperMessage && (
              <OfferMessage
                helperOffer={helperOffer}
                onClickActivity={onClickActivity}
                selectedStatus={selectedStatus}
              />
            )}
            <p id="status-message">{statusMessage}</p>
          </div>
        </>
      )}
      {myOffersActiveComp}
    </div>
  );
};

export default Offers;
