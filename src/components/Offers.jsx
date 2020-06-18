import React from "react";
import { List,Button, Card } from 'semantic-ui-react'

const Offers = ({ request }) => {

  const showHelperMessage = ()=>{
    console.log("BAJS")
  }

  const helper = request.offers.map((offer) => (
    
      <List.Item id={"offer-" + offer.id}>
        <List.Content>
          <List.Header onClick={showHelperMessage} id={"helper-email"}>{offer.helper.email}</List.Header>
        </List.Content>
      </List.Item>
    
  ));
  
  return (
    <List divided relaxed id="offers">
      <h3>Offers</h3>
      {helper}
      </List>
  );
};

export default Offers;
