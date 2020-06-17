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
  }
};

const getMyQuestsOrRequests = async type => {
  try {
    const response = await axios.get(`/my_requests/${type}`);
    return response.data.requests
  } catch (error) {
    console.log(error);
  }
}

export { getRequests, getMyQuestsOrRequests };
