import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import createHeaders from "../modules/headers";
import { AboutReQuest, SelectedRequest } from "./AboutReQuest";
import CreateOffer from "./CreateOffer";
import { useHistory } from "react-router-dom";

const SpecificRequest = () => {
  const selectedRequest = useSelector(
    (state) => state.requests.selectedRequest
  );
  const [message, setMessage] = useState("");
  const history = useHistory();
  const user = useSelector((state) => state.authentication.uid);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const onContactHandler = () => setShowMessageForm(true);

  const createOffer = async (e) => {
    const resp = await axios.post(
      "/offers",
      {
        request_id: selectedRequest.id,
        message: e.target.firstElementChild.value,
      },
      { headers: createHeaders() }
    );
    setMessage(resp.data.message);
    setShowMessageForm(false);
    // history.push("/myrequest/requests");
  };

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
      {showMessageForm && <CreateOffer createOffer={createOffer} />}
      {message !== "" && <p id="message"> {message}</p>}
    </>
  );
};

export default SpecificRequest;
