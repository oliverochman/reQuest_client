import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import createHeaders from "../modules/headers";
import { AboutReQuest, SelectedRequest } from "./AboutReQuest";
import { CreateOffer } from "./CreateOffer";

const SpecificRequest = (props) => {
  const selectedRequest = useSelector(
    (state) => state.requests.selectedRequest
  );
  const user = useSelector((state) => state.authentication.uid);
  const onContactHandler = () => props.setShowMessageForm(true);

  const createOffer = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "/offers",
      {
        request_id: selectedRequest.id,
        message: e.target.firstElementChild.value,
      },
      { headers: createHeaders() }
    );
    props.setMessage(response.data.message);
    props.setShowMessageForm(false);
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
        <div id="specific-component">
          <SelectedRequest
            onContactHandler={onContactHandler}
            selectedRequest={selectedRequest}
            statusMessage={statusMessage}
            disableButton={disableButton}
            showMessageForm={props.showMessageForm}
            message={props.message}
          />
          {props.showMessageForm && <CreateOffer createOffer={createOffer} />}
          {props.message !== "" && <p id="message"> {props.message}</p>}
        </div>
      );
    } else {
      return (
        <div id="specific-component">
          <AboutReQuest />
        </div>
      );
    }
  };

  return render();
};

export default SpecificRequest;
