import React from "react";
import { List } from "semantic-ui-react";

const OfferList = (props) => {
  let offerlist = () => {
    return (
      <List.Item id={"offer-" + props.offer.id} key={props.offer.id}>
        <List.Content>
          <List.Header
            onClick={props.onHelperClick}
            className={"helper-email-" + props.offer.id}
            id={props.index}
            style={{ cursor: "pointer" }}
          >
            {props.offer.email}
          </List.Header>
        </List.Content>
      </List.Item>
    );
  };
  return (
    <>
      {props.requestStatus === "pending" && props.offer.status === "pending"
        ? offerlist()
        : props.requestStatus === "active" && props.offer.status === "accepted"
        ? offerlist()
        : props.requestStatus === "completed" &&
          props.offer.status === "accepted" &&
          offerlist()}
    </>
  );
};
export default OfferList;
