import axios from "axios";
import createHeaders from "../modules/headers";

export const updateOffer = async (activity, id) => {
  try {
    const resp = await axios.put(
      `/offers/${id}`,
      {
        activity: activity,
      },
      { headers: createHeaders() }
    );
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const updateRequest = async (mySelectedRequestId) => {
  try {
    const resp = await axios.put(
      `/my_request/requests/${mySelectedRequestId}`,
      { params: { activity: "completed" } },
      { headers: createHeaders() }
    );
    return resp;
  } catch (error) {
    return error;
  }
};

export const createReplyMessages = async (mySelectedRequestId, message) => {
  debugger;
  try {
    const resp = await axios.post(
      `/offers/${mySelectedRequestId}/messages`,
      {
        message: message,
      },
      { headers: createHeaders() }
    );
    debugger;
    return resp;
  } catch (error) {
    debugger;
    console.error(error);
  }
};
