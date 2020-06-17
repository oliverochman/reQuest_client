import React from "react";
import MyListComponent from "./MyListComponent";
import { Menu, Button } from "semantic-ui-react";
import { useSelector } from "react-redux";
import Offers from "./Offers";

const MyRequestsPage = () => {
  const activeRequest = useSelector((state) => state.requests.activeRequest);

  return (
    <div id="page-container">
      <div id="leftmost-component">
        <Menu vertical secondary>
          <Menu.Item active="true">pending</Menu.Item>
          <Menu.Item>active</Menu.Item>
          <Menu.Item>completed</Menu.Item>
        </Menu>
        <Button>Create new reQuest</Button>
      </div>
      <MyListComponent />
      {activeRequest && <Offers request={activeRequest} />}
    </div>
  );
};

export default MyRequestsPage;
