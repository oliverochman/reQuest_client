import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import OfferMessage from "./OfferMessage";
import OfferList from "./OfferList";
import axios from "axios";
import updateMyRequest from "../modules/updateMyRequest";
import { useDispatch } from "react-redux";

const Offers = ({ request }) => {
  const dispatch = useDispatch();
  const [showHelperMessage, setShowHelperMessage] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [helperOffer, setHelperOffer] = useState({});
  const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));

  useEffect(() => {
    updateMyRequest(request, dispatch);
  }, [request]);

  const onHelperClick = (e) => {
    setShowHelperMessage(true);
    setHelperOffer({ ...request.offers[parseInt(e.target.id)] });
  };

  const onClickActivity = async (e) => {
    const resp = await axios.put("/offers", {
      headers: headers,
      activity: e.target.id,
    });
    setStatusMessage(resp.data.message);
  };

  const myOffers = request.offers.map((offer, index) => (
    <OfferList offer={offer} index={index} onHelperClick={onHelperClick} />
  ));

  return (
    <div style={{ marginLeft: "30px", display: "flex", flexDirection: "row" }}>
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
          />
        )}
        <p id="status-message">{statusMessage}</p>
      </div>
    </div>
  );
};

export default Offers;
