import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import OfferMessage from "./OfferMessage";
import OfferList from "./OfferList";
import axios from "axios";
import { getSingleRequest } from "../modules/getRequests";
import { useSelector, useDispatch } from "react-redux";

const Offers = () => {
  const dispatch = useDispatch();
  const [showHelperMessage, setShowHelperMessage] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [helperOffer, setHelperOffer] = useState({});
  const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  const mySelectedRequest = useSelector(
    (state) => state.requests.mySelectedRequest
  );

  useEffect(() => {
    const updateRequest = async () => {
      await getSingleRequest(dispatch, mySelectedRequest.id);
    };
    updateRequest(dispatch, mySelectedRequest);
  }, [mySelectedRequest, dispatch]);

  const onHelperClick = (e) => {
    setShowHelperMessage(true);
    setHelperOffer({ ...mySelectedRequest.offers[parseInt(e.target.id)] });
  };

  const onClickActivity = async (e) => {
    const resp = await axios.put("/offers", {
      headers: headers,
      activity: e.target.id,
    });
    setStatusMessage(resp.data.message);
    getSingleRequest(dispatch, mySelectedRequest.id);
  };
  const myOffers = mySelectedRequest.offers.map((offer, index) => (
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
