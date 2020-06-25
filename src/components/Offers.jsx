import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import OfferMessage from "./OfferMessage";
import OfferList from "./OfferList";

import updateMyRequest from "../modules/updateMyRequest";
import { useDispatch } from "react-redux";
import {
  updateOffer,
  markRequestCompleted,
  replyToConversation,
} from "../modules/messaging";

const Offers = ({ request, selectedStatus, page }) => {
  const dispatch = useDispatch();
  // const [showHelperMessage, setShowHelperMessage] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  // const [helperOffer, setHelperOffer] = useState({});
  const [, triggerMessagesUpdate] = useState({});
  const [completedMessage, setCompletedMessage] = useState("");
  const [error, setError] = useState(false);

  const [showActiveOffer, setShowActiveOffer] = useState(false);
  const [activeOffer, setActiveOffer] = useState();
  // const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    getAcceptedOffer();
  }, []);

  const getAcceptedOffer = (request) => {
    if (request.status === "active" || request.status === "completed") {
      const offer = request.offers.filter(
        (offer) => offer.status === "accepted"
      )[0];
      setActiveOffer(offer);
      setShowActiveOffer(true);
    }
  };
  const onHelperClick = (e) => {
    e.preventDefault();
    setActiveOffer({ ...request.offers[parseInt(e.target.id)] });
    setShowActiveOffer(true);
  };

  const updateOfferStatus = async (e) => {
    const response = await updateOffer(e.target.id, activeOffer.id);
    setStatusMessage(response.data.message);
    await updateMyRequest(request, dispatch);
    setShowActiveOffer(false);
    dispatch({ type: "FETCH_MY_REQUESTS", payload: { getMyRequests: false } });
  };

  const completeRequest = async () => {
    const response = await markRequestCompleted(request.id);
    if (!response.status === 200) {
      setCompletedMessage(response.data.message);
      dispatch({
        type: "FETCH_MY_REQUESTS",
        payload: { getMyRequests: false },
      });
      setError(false);
      setShowActiveOffer(false);
    } else {
      setCompletedMessage(response.response.data.message);
      setError(true);
    }
  };

  const replyOfferMessage = async (e) => {
    const message = e.target.replyMessage.value;
    const resp = await replyToConversation(acceptedHelperOffer.id, message);
    resp &&
      activeOffer.conversation.messages.push({
        me: true,
        content: message,
      }) &&
      triggerMessagesUpdate(resp);
    dispatch({ type: "FETCH_MY_REQUESTS", payload: { getMyRequests: false } });
  };

  const myOffer =
    request.offers &&
    request.offers.map((offer, index) => (
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

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {selectedStatus === "pending" && (
        <>
          <List divided relaxed id="offers">
            <h3>Offers</h3>
            {myOffer}
          </List>
          <div
            style={{
              marginLeft: "30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <p id="status-message">{statusMessage}</p>
          </div>
        </>
      )}
      {showActiveOffer && (
        <OfferMessage
          helperOffer={activeOffer}
          onClickActivity={updateOfferStatus}
          completeRequest={completeRequest}
          replyOfferMessage={replyOfferMessage}
          completedMessage={completedMessage}
          error={error}
          selectedStatus={selectedStatus}
          page={page}
        />
      )}
    </div>
  );
};

export default Offers;
