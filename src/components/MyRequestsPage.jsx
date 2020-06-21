import React, { useState } from "react";
import MyListComponent from "./MyListComponent";
import { Menu, Button } from "semantic-ui-react";
import { useSelector } from "react-redux";
import Offers from "./Offers";
import { Link, Redirect } from "react-router-dom";

const MyRequestsPage = () => {
  const mySelectedRequest = useSelector(
    (state) => state.requests.mySelectedRequest
  );
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  );

  const showMyRequests = (status) => {
    setSelectedStatus(status);
  };

  return (
    <div id="page-container">
      {!authenticated ? (
        <Redirect to="/login" />
      ) : (
        <>
          <div id="leftmost-component">
            <Menu vertical secondary>
              <Menu.Item
                id="pending-link"
                active={selectedStatus === "pending"}
                onClick={() => showMyRequests("pending")}
              >
                pending
              </Menu.Item>
              <Menu.Item
                id="active-link"
                active={selectedStatus === "active"}
                onClick={() => showMyRequests("active")}
              >
                active
              </Menu.Item>
              <Menu.Item
                id="completed-link"
                active={selectedStatus === "complete"}
                onClick={() => showMyRequests("completed")}
              >
                completed
              </Menu.Item>
            </Menu>
            <Link to="/myrequest/newrequest" id="create-request-link">
              <Button>Create new reQuest</Button>
            </Link>
          </div>
          <div id="middle-left-component" style={{ marginLeft: "30px" }}>
            <MyListComponent selectedStatus={selectedStatus} />
          </div>
          <div id="middle-right-component" style={{ marginLeft: "30px" }}>
            {mySelectedRequest && (
              <Offers
                request={mySelectedRequest}
                selectedStatus={selectedStatus}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MyRequestsPage;
