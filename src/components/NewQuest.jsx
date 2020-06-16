import React, { useState } from "react";
import { Form, Button,Input } from "semantic-ui-react";
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
    try {
      const response = await axios.post(
        "/api/requests",
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

  const isLogin = authenticated && (
    <div>
      <p style={{ fontSize: "110%" }}>
        Good {time} <br></br>
        {uid}
      </p>
    </div>
  );
  return (
    <>
    {/* Needs to be removed as soon as we have the header */}
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
      <div className="newQuest-container">
        {isLogin}
        <h1>{"New reQuest"}</h1>
        <Form onSubmit={(e) => submitQuest(e)}>
          <Form.Input
            id="title"
            name="Title"
            type="text"
            placeholder="Quest Title"
          />
          <Form.TextArea 
            id="description"
            name="Description"
            placeholder="Quest Description"
            type="textarea"
          />
          <Input
            id="submit"
            type="submit"
            value="Submit"
            rows="5"
            cols="40"
            required
          />
        </Form>
        <p id="message">{message}</p>
      </div>
    </>
  );
};

export default NewQuest;
