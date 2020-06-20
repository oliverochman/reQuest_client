import axios from "axios";

const getRequests = async (dispatch) => {
  try {
    const response = await axios.get("/requests");
    dispatch({
      type: "GET_REQUESTS",
      payload: {
        requests: response.data.requests,
      },
    });
  } catch (error) {
    console.log(error);
    return []
  }
};

const getMyRequests = async () => {
  try {
    const response = await axios.get("/my_request/requests");
    return response.data.requests
  } catch (error) {
    console.log(error);
    return []
  }
}

const getSingleRequest = async (dispatch, id) => {
  try {
    const response = await axios.get(`/my_request/requests/${id}`);
    dispatch({type: "SET_MY_SELECTED_REQUEST", payload: {request: response.data.request}})
  } catch (error) {
    console.log(error)
  }
};

export { getRequests, getMyRequests, getSingleRequest };
