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
  const [message, setMessage] = useState('');

  const logout = async () => {
    try {
      await auth.signOut();
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.log(error);
    }
  };

  let time;

  if (currentTime < 12) {
    time = "Morning";
  } else if (currentTime < 18) {
    time = "Afternoon";
  } else {
    time = "Evening";
  }
  const submitQuest = async (e) => {
    try {
      const response = await axios.post("/quests", {
        title: e.target.title.value,
        description: e.target.description.value,
      },
      { headers: createHeaders()
      });
      debugger
      setMessage(response.message)
    } catch (error) {
      setMessage(error)
    }
  };

  return (
    <>
      <div id="login">
        {!authenticated ? (
          <div name="Login">
            <Button size="small" floated="right" basic inverted id="login">
              Login
            </Button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>

      <Form onSubmit={(e) => submitQuest(e)}>
        <input id="title" name="Title" type="text" placeholder="Quest Title" />
        <br />
        <textarea
          id="description"
          name="Description"
          placeholder="Quest Description"
        />
        <br />
        <input id="submit" type="submit" value="Submit" />
      </Form>
      <p id='message'>{message}</p> 
    </>
  );
};

export default NewQuest;
