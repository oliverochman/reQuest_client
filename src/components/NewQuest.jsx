import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../modules/auth";
import axios from "axios";
import createHeaders from "../modules/headers";

const NewQuest = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.uid);
  const authenticated = useSelector((state) => state.authenticated);
  const date = new Date();
  const currentTime = date.getHours();
  const [message, setMessage] = useState("");

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

  const submitQuest = async (e) => {
    console.log("authenticated: " + authenticated);
    try {
      const response = await axios.post(
        "http//localhost:3001/api/quests",
        {
          title: e.target.title.value,
          description: e.target.description.value,
        },
        { headers: createHeaders() }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error);
    }
  };

  const isLogin = !authenticated ? (
    <div name="login">
      <Button size="small" floated="right" basic inverted id="login">
        Login
      </Button>
    </div>
  ) : (
    <div>
      <p style={{ fontSize: "110%" }}>
        Good {time} <br></br>
        {uid}
      </p>
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
    </div>
  );
  return (
    <>
      <div className="login-container">
        {isLogin}
        <Form onSubmit={(e) => submitQuest(e)}>
          <input
            id="title"
            name="Title"
            type="text"
            placeholder="Quest Title"
          />
          <br />
          <textarea
            id="description"
            name="Description"
            placeholder="Quest Description"
          />
          <br />
          <input id="submit" type="submit" value="Submit" />
        </Form>
        <p id="message">{message}</p>
      </div>
    </>
  );
};

export default NewQuest;
