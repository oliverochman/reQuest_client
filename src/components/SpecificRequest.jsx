import React, { useState } from "react";
import { useSelector } from "react-redux";

import { AboutReQuest, SelectedRequest } from "./AboutReQuest";
import Message from "./Message";

const SpecificRequest = () => {
  const selectedRequest = useSelector(
    (state) => state.requests.selectedRequest
  );
  const user = useSelector((state) => state.authentication.uid);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const onContactHandler = () => setShowMessageForm(true);

  const render = () => {
    let disableButton, statusMessage;
    if (selectedRequest) {
      switch (true) {
        case !user:
          disableButton = true;
          statusMessage = "Log in or sign up to offer your help";
          break;
        case user && selectedRequest.offerable:
          disableButton = false;
          break;
        case user &&
          !selectedRequest.offerable &&
          selectedRequest.requester === user:
          disableButton = true;
          statusMessage = "You cannot make an offer on your own request";
          break;
        default:
          disableButton = true;
          statusMessage = "You have already offered to help with this request";
      }
      return (
        <>
          <SelectedRequest
            onContactHandler={onContactHandler}
            selectedRequest={selectedRequest}
            statusMessage={statusMessage}
            disableButton={disableButton}
          />
        </>
      );
    } else {
      return <AboutReQuest />;
    }
  };

  return (
    <>
      <div id="specific-component">{render()}</div>
      {showMessageForm && <Message />}
    </>
  );
};

export default SpecificRequest;
