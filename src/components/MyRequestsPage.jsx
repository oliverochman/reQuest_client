import React, { useState } from "react";
import MyListComponent from "./MyListComponent";
import { Menu, Button } from "semantic-ui-react";
import { useSelector } from "react-redux";
import Offers from "./Offers";
import { Link, Redirect } from "react-router-dom";

const MyRequestsPage = () => {
  const mySelectedRequest = useSelector((state) => state.requests.mySelectedRequest);
  const [selectedStatus, setSelectedStatus] = useState("pending")
  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  );

const doSomething = (status) => {
  setSelectedStatus(status)
}

  return (
    <div id="page-container">
      {!authenticated ? (
        <Redirect to="/login" />
      ) : (
        <>
          <div id="leftmost-component">
            <Menu vertical secondary>
            <Menu.Item id="pending-link" active={selectedStatus === "pending"} onClick={() => doSomething("pending")}>
                pending
              </Menu.Item>
              <Menu.Item id="active-link" active={selectedStatus === "active"} onClick={() => doSomething("active")}>
                active
              </Menu.Item>
              <Menu.Item id="completed-link" active={selectedStatus === "complete"} onClick={() => doSomething("completed")}>completed</Menu.Item>
            </Menu>
            <Link to="/myrequest/newrequest" id="create-request-link">
              <Button>Create new reQuest</Button>
            </Link>
          </div>
          <div id="middle-component">
            <MyListComponent selectedStatus={selectedStatus}/>
            {mySelectedRequest && (selectedStatus === "pending") && <Offers request={mySelectedRequest} />}
          </div>
        </>
      )}
    </div>
  );
};

export default MyRequestsPage;
