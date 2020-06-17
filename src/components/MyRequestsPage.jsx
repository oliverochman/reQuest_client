import React, { useState } from "react";
import MyListComponent from "./MyListComponent";
import { Menu, Button } from "semantic-ui-react";

const MyRequestsPage = () => {

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
      <MyListComponent type="requests" />
    </div>
  );
};

export default MyRequestsPage;
