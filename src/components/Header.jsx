import React, { useState } from "react";
import { auth } from "../modules/auth";
import { Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const uid = useSelector((state) => state.authentication.uid);
  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  );
  const date = new Date();
  const currentTime = date.getHours();

  const logout = async () => {
    try {
      await auth.signOut();
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      setMessage(error);
    }
  };

  let time =
    currentTime < 12 ? "Morning" : currentTime < 18 ? "Afternoon" : "Evening";

  const greeting = authenticated && (
    <div>
      <p className="input-labels" style={{ fontSize: "110%" }}>
        Good {time} &nbsp;
        {uid}
      </p>
    </div>
  );

  return (
    <div id="header">
      <div id="logo">
        <span id="hfirst">re</span>
        <span id="hsecond">Quest</span>
        <div id="yellow_divider"></div>
        <div id="green_divider"></div>
      </div>
      <div id="links">
        <div id="small_links">
          <NavLink to="/myrequest">profile</NavLink>
          <NavLink to="/myrequest">Quests</NavLink>
          <NavLink to="/myrequest">reQuests</NavLink>
        </div>
        <NavLink id="myrequest-link" to="/myrequest">
          my reQuest
        </NavLink>
      </div>
      <div id="welcome-and-logout">
        <p id="loginmessage">{message}</p>
        {greeting}
        <Button
          basic
          inverted
          size="small"
          id="logout"
          onClick={() => logout()}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
