import React, { useState } from "react";
import { List } from "semantic-ui-react";
import OfferMessage from "./OfferMessage";

const Offers = ({ request }) => {
  const [showHelperMessage, setShowHelperMessage] = useState(false);
  const [activeOffer, setActiveOffer] = useState({});
  const onHelperClick = (e) => {
    setShowHelperMessage(true);
    setActiveOffer({ ...request.offers[parseInt(e.target.id)] });
  };

  const helper = request.offers.map((offer, index) => (
    <List.Item id={"offer-" + offer.id}>
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
  ));

  return (
    <List divided relaxed id="offers">
      <h3>Offers</h3>
      {helper}
      {showHelperMessage && <OfferMessage activeOffer={activeOffer} />}
    </List>
  );
};

export default Offers;
