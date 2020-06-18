import initialState from "../store/initialState";

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_REQUESTS":
      return {
        ...state,
        requests: action.payload.requests,
      };
    case "SET_ACTIVE_REQUEST":
      return {
        ...state,
        activeRequest: action.payload.request,
      };
    case "RESET_ACTIVE_REQUEST":
      return {
        ...state,
        activeRequest: false
      }
    default:
      return state;
  }
};

export default requestReducer;
