import React from "react";
import OfferMessage from "./OfferMessage";

const Offers = ({ request, selectedStatus }) => {
  const offers = request.offers.map((offer) => (
    <div id={"offer-" + offer.id}>
      <p id={"offer-email"}>{offer.helper.email}</p>
      <p id={"offer-message"}>{offer.message}</p>
    </div>
  ));

  const acceptedHelperOffer = request.offers.filter(
    (offer) => offer.status === "accepted"
  )[0];

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {selectedStatus === "pending" && (
        <div id="offers">
          <h3>Offers</h3>
          {offers}
        </div>
      )}
      {selectedStatus === "active" && (
        <OfferMessage helperOffer={acceptedHelperOffer} />
      )}
    </div>
  );
};

export default Offers;
