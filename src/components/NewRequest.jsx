import React, { useState } from "react";
import { Form, Input } from "semantic-ui-react";
import axios from "axios";
import createHeaders from "../modules/headers";

const NewRequest = () => {
  const [message, setMessage] = useState("");

  const submitRequest = async (e) => {
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

  return (
    <>
      <div className="newQuest-container">
        <h1>{"New reQuest"}</h1>
        <Form onSubmit={(e) => submitRequest(e)}>
          <Form.Input
            id="title"
            name="Title"
            type="text"
            placeholder="reQuest Title"
          />
          <Form.TextArea
            id="description"
            name="Description"
            placeholder="reQuest Description"
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

export default NewRequest;
