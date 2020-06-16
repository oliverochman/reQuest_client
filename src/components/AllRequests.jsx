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

  const buildRequestCards = () => {
    const qCards = [];
    let i = 0;
    while (i < requests.length) {
      qCards.push(
        <Grid.Row style={{ padding: 0, margin: 5 }}>
          <Grid.Column
            width={3}
            style={{ padding: 0, marginLeft: 10, width: "fit-content" }}
          >
            <RequestCard request={requests[i]} />
            <RequestCard request={requests[i + 1]} />
            <RequestCard request={requests[i + 2]} />
          </Grid.Column>
          <Grid.Column
            width={3}
            style={{ padding: 0, marginLeft: 10, width: "fit-content" }}
          >
            <RequestCard request={requests[i + 3]} />
            <RequestCard request={requests[i + 4]} />
            <RequestCard request={requests[i + 5]} />
          </Grid.Column>
          <Grid.Column
            width={3}
            style={{ padding: 0, marginLeft: 10, width: "fit-content" }}
          >
            <RequestCard request={requests[i + 6]} />
            <RequestCard request={requests[i + 7]} />
            <RequestCard request={requests[i + 8]} />
          </Grid.Column>
        </Grid.Row>
      );
      i += 9;
    }
    return qCards;
  };

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
        {buildRequestCards()}
      </Grid>
    </div>
  );
};

export default AllRequests;
