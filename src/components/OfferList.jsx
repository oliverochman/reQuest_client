import React from "react";
import { List } from "semantic-ui-react";

const OfferList = (props) => {
  return (
    <List.Item id={"offer-" + props.offer.id} key={props.offer.id}>
      <List.Content>
        <List.Header
          onClick={props.displayOffer}
          className={"helper-email-" + props.offer.id}
          id={props.offer.id}
          type="button"
        >
          {props.offer.email}
        </List.Header>
      </List.Content>
    </List.Item>
  )
};
export default OfferList;
