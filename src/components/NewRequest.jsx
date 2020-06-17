import React, { useState } from "react";
import { Form, Input, Container } from "semantic-ui-react";
import axios from "axios";
import createHeaders from "../modules/headers";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const NewRequest = () => {
  const [message, setMessage] = useState("");
  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  );

  const submitRequest = async (e) => {
    e.persist();
    try {
      const response = await axios.post(
        "/requests",
        {
          title: e.target.title.value,
          description: e.target.description.value,
          reward: e.target.reward.value,
        },
        { headers: createHeaders() }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <div id="page-container">
      {!authenticated ? (
        <Redirect to={{ pathname: "/login" }} />
      ) : (
        <Container className="form-container">
          <h1 className='input-labels'>{"New reQuest"}</h1>
          <Form id="newRequest-form" onSubmit={(e) => submitRequest(e)}>
            <Form.Input
              id="title"
              name="Title"
              type="text"
              placeholder="reQuest Title"
              required
            />
            <Form.TextArea
              id="description"
              name="Description"
              placeholder="reQuest Description"
              type="textarea"
              required
            />
            <Form.Input
              id="reward"
              name="Reward"
              type="number"
              placeholder="Karma Points"
              min='0'
              step="5"
              required
            />
            <Input
              id="submit-btn"
              type="submit"
              value="Submit"
              rows="5"
              cols="40"
              required
            />
          </Form>
          <p className='input-labels' id="message">{message}</p>
        </Container>
      )}
    </div>
  );
};

export default NewRequest;
