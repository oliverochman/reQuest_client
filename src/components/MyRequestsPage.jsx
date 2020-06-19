import React, { useState } from "react";
import MyListComponent from "./MyListComponent";
import { Menu, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import Offers from "./Offers";
import ActiveRequest from "./ActiveRequest";
import { Link, Redirect } from "react-router-dom";
import { getMyRequests } from "../modules/getRequests";
import Axios from "axios";

const MyRequestsPage = () => {
  const [message, setMessage] = useState();
  const mySelectedRequest = useSelector(
    (state) => state.requests.mySelectedRequest
  );
  const mySelectedActiveRequest = useSelector(
    (state) => state.requests.mySelectedActiveRequest
  );
  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  );
  const dispatch = useDispatch();

  const getMyActiveRequest = async () => {
    let requests = await getMyRequests();
    let activeRequest = requests.filter((request) => {
      return request.status === "active";
    });
    let activeRequestElement = activeRequest[0];
    dispatch({
      type: "SET_MY_SELECTED_ACTIVE_REQUEST",
      payload: {
        request: activeRequestElement,
      },
    });
  };

  const completeRequest = async () => {
    try {
      const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
      const response = await Axios.put(
        `/my_requests/requests/${mySelectedActiveRequest.id}`,
        { headers: headers },
        { params: { activity: "completed" } }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div id="page-container">
      {!authenticated ? (
        <Redirect to="/login" />
      ) : (
        <>
          <div id="leftmost-component">
            <Menu vertical secondary>
              <Menu.Item id="pending" active="true">
                pending
              </Menu.Item>
              <Menu.Item id="active" onClick={getMyActiveRequest}>
                active
              </Menu.Item>
              <Menu.Item id="completed">completed</Menu.Item>
            </Menu>
            <Link to="/myrequest/newrequest" id="create-request-link">
              <Button>Create new reQuest</Button>
            </Link>
          </div>
          <div id="middle-component">
            <MyListComponent />
            {mySelectedRequest && <Offers request={mySelectedRequest} />}
          </div>
          <div id="rightmost-component">
            {mySelectedActiveRequest && (
              <ActiveRequest request={mySelectedActiveRequest} />
            )}
            {mySelectedActiveRequest && (
              <>
                <Button id="quest-completed" onClick={completeRequest}>
                  Quest Completed
                </Button>
                <p id="message">{message}</p>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MyRequestsPage;
