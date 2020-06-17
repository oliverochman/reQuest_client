import React, { useState } from "react";
import { auth } from "../modules/auth";
import { Button, Grid } from "semantic-ui-react";
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
      <p id="greeting" style={{ fontSize: "110%" }}>
        Good {time} &nbsp;
        {uid}
      </p>
    </div>
  );

  return (
    <>
      <Grid id="header">
        <Grid.Row columns="equal">
          <Grid.Column>
            <p style={{ float: "left" }} id="hfirst">
              re
            </p>
            <p style={{ float: "left" }} id="hsecond">
              Quest
            </p>
          </Grid.Column>
          <Grid.Column>{greeting}</Grid.Column>
          <Grid.Column>
            <p id="loginmessage">{message}</p>
          </Grid.Column>
          <Grid.Column>
            {authenticated && (
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
            </div>)}
          </Grid.Column>
          <Grid.Column>
            <NavLink
              id="myrequest-btn"
              to="/myrequest"
            >
              my reQuest
            </NavLink>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Header;
