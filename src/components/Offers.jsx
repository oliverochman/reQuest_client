import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import OfferMessage from "./OfferMessage";
import axios from "axios";
import { useDispatch } from "react-redux";

const Offers = ({ request }) => {
  const [showHelperMessage, setShowHelperMessage] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [helperOffer, setHelperOffer] = useState({});
  const [helperOfferStatus, setHelperOfferStatus] = useState({});

  const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  // const dispatch = useDispatch();
  // console.log({ request });

  // useEffect(() => {
  //   getOffersId();
  // }, [onClickActivity]);

  // const getOffersId = async () => {
  //   const resp = await axios.get("/offers/", {
  //     headers: headers,
  //   });
  //   debugger;
  // };

  const onHelperClick = (e) => {
    setShowHelperMessage(true);
    setHelperOffer({ ...request.offers[parseInt(e.target.id)] });
    setHelperOfferStatus(request.offers[parseInt(e.target.id)].status);
    // debugger;
  };

  const onClickActivity = async (e) => {
    const resp = await axios.put("/offers", {
      headers: headers,
      activity: e.target.id,
    });
    setStatusMessage(resp.data.message);
  };

  const helper = request.offers.map(
    (offer, index) =>
      offer.status === "pending" && (
        <List.Item id={"offer-" + offer.id} key={offer.id}>
          <List.Content>
            <List.Header
              onClick={onHelperClick}
              className={"helper-email-" + offer.id}
              id={index}
            >
              {offer.helper.email}
            </List.Header>
          </List.Content>
        </List.Item>
      )
  );

  return (
    <List divided relaxed id="offers">
      <h3>Offers</h3>
      {helper}
      {showHelperMessage && (
        <OfferMessage
          helperOffer={helperOffer}
          onClickActivity={onClickActivity}
          helperOfferStatus={helperOfferStatus}
        />
      )}
      {statusMessage}
    </List>
  );
};

export default Offers;
