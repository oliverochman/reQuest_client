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
      <p style={{ fontSize: "110%" }}>
        Good {time} <br></br>
        {uid}
      </p>
    </div>
  );

  return (
    <>
      <div id="header">
        <p style={{ float: "left" }} id="hfirst">
          re
        </p>
        <p style={{ float: "left" }} id="hsecond">
          Quest
        </p>
        {greeting}
        <div name="Logout">
          <Button
            floated="right"
            basic
            inverted
            size="small"
            id="logout"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </div>
        <div>
          <NavLink
            id="myrequest-btn"
            style={{ float: "right" }}
            to="/myrequest"
          >
            my reQuest
          </NavLink>
        </div>
        <p id="loginmessage">{message}</p>
      </div>
    </>
  );
};

export default Header;
