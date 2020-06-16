import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getRequests from "../modules/getRequests";
import RequestCard from "./RequestCard";
import { Grid } from "semantic-ui-react";

const AllRequests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => {
    return state.requests.requests;
  });

  useEffect(() => {
    getRequests(dispatch);
  }, []);

  const requestCards = requests.map((request) => (
    <RequestCard request={request} />
  ));

  return (
    <div>
      <Grid
        id="qcards"
        fluid
        columns={3}
        divided
        centered
        style={{ marginTop: 100 }}
      >
        {requestCards}
      </Grid>
    </div>
  );
};

export default AllRequests;
