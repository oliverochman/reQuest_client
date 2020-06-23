import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import OfferMessage from "./OfferMessage";
import OfferList from "./OfferList";
import axios from "axios";
import updateMyRequest from "../modules/updateMyRequest";
import { useDispatch } from "react-redux";
import createHeaders from "../modules/headers";

const Offers = ({ request, selectedStatus }) => {
  const dispatch = useDispatch();
  const [showHelperMessage, setShowHelperMessage] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [helperOffer, setHelperOffer] = useState({});
  const [updateOffer, setUpdateOffer] = useState(true);

  // useEffect(() => {
  //   updateMyRequest(request, dispatch);
  // }, [updateOffer]);

  const onHelperClick = (e) => {
    setShowHelperMessage(true);
    setHelperOffer({ ...request.offers[parseInt(e.target.id)] });
  };

  const onClickActivity = async (e) => {
    const resp = await axios.put(
      `/offers/${helperOffer.id}`,
      {
        activity: e.target.id,
      },
      { headers: createHeaders() }
    );
    setStatusMessage(resp.data.message);
    await updateMyRequest(request, dispatch);
    // setUpdateOffer(!updateOffer);
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
