import { getSingleRequest } from "./getRequests";

const updateRequest = async (request, dispatch) => {
  const response = await getSingleRequest(request.id);
  dispatch({
    type: "SET_MY_SELECTED_REQUEST",
    payload: { request: response.data.request },
  });
};

export default updateRequest;
