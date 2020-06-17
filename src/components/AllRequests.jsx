import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequests } from "../modules/getRequests";
import RequestCard from "./RequestCard";
import { Grid } from "semantic-ui-react";

const AllRequests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests.requests);

  useEffect(() => {
    getRequests(dispatch);
  }, []);

  const requestCards = requests.map((request) => (
    <RequestCard key={request.id} request={request} />
  ));

  return (
    <div>
      <Grid id="qcards" columns={3} centered >
        {requestCards}
      </Grid>
    </div>
  );
};

export default AllRequests;
