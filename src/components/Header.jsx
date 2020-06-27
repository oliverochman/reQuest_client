import React, { useState } from "react";
import { auth } from "../modules/auth";
import { Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import getKarma from '../modules/getKarma'

const Header = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const karmaPoints = useSelector((state) => state.karma.karma);
  const [activeTab, setActiveTab] = useState("requests");
  const activePage = useSelector((state) => state.pages.activePage);
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

  const setActivePage = (page) => {
    dispatch({ type: "SET_ACTIVE_PAGE", payload: page });
    getKarma(dispatch);
  };

  const setActiveMenuItem = (tab) => {
    dispatch({ type: "RESET_MY_SELECTED_REQUEST" })
    setActiveTab(tab)
  }

  const activeMenuItem = (menuItem) => {
    if (menuItem === activeTab) {
      return "activeTab"
    } else {
      return "inactiveTab"
    }
  };

  return (
    <div id="header">
      <div id="logo">
        <Link to="/"
          onClick={() => setActivePage("home")}
        >
        <span id="hfirst">re</span>
        <span id="hsecond">Quest</span>
        </Link>
        <div id="yellow_divider"></div>
        <div id="green_divider"></div>
      </div>
      <div id="links">
        {activePage === "home" && (
          <NavLink
            id="myrequest-home-link"
            to={authenticated ? "/myrequest/requests" : "/login"}
            onClick={authenticated && (() => {
              setActivePage("myrequest")
              setActiveMenuItem("requests")            
            })}
          >
            my reQuest
          </NavLink>
        )}
        {activePage === "myrequest" && (
          <>
            <NavLink
              id="myrequest-home-link"
              to="/"
              onClick={() => setActivePage("home")}
            >
              home
            </NavLink>
            <div id="points-display">
              <p id="karma-points-amount">{karmaPoints} p</p>
            </div>
            <div id="small_links">
              <NavLink
                id="quests-link"
                to="/myrequest/quests"
                className={activeMenuItem("quests")}
                onClick={() => setActiveMenuItem("quests")}
              >
                Quests
              </NavLink>
              <NavLink
                id="requests-link"
                to="/myrequest/requests"
                className={activeMenuItem("requests")}
                onClick={() => setActiveMenuItem("requests")}
              >
                reQuests
              </NavLink>
            </div>
          </>
        )}
      </div>
      <div id="welcome-and-logout">
        <p id="loginmessage">{message}</p>
        {authenticated && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
