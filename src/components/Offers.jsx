import React from "react";
import { List } from 'semantic-ui-react'

const Offers = ({ request }) => {
  const helper = request.offers.map((offer) => (
    
    <div id={"offer-" + offer.id}>
      <p id={"helper-email"}>{offer.helper.email}</p>
      {/* <p id={"helper-message"}>{offer.message}</p> */}
    </div>
  ));
  
  return (
    // <div id="offers">
    <List divided relaxed id="offers">
      <h3>Offers</h3>
      {helper}
      </List>
    // </div>
  );
};

export default Offers;
