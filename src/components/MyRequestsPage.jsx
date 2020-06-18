import React from "react";
import MyListComponent from "./MyListComponent";
import { Menu, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import Offers from "./Offers";
import { Link, Redirect } from "react-router-dom";
import getMyRequests from "../modules/getRequests";

const MyRequestsPage = () => {
  const mySelectedRequest = useSelector(
    (state) => state.requests.mySelectedRequest
  );
  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  );
  const dispatch = useDispatch();

  const getMyActiveRequests = async () => {
    let requests = getMyRequests();
    let activeRequest = requests.filter((request) => {
      request.status == "active";
    });
    dispatch({
      type: "SET_MY_SELECTED_REQUEST",
      payload: {
        request: activeRequest,
      },
    });
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
              <Menu.Item id="active" onClick={getMyActiveRequests}>
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
            <Button id="quest-completed">Quest Completed</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyRequestsPage;
