import initialState from "../store/initialState";

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_REQUESTS":
      return {
        ...state,
        requests: action.payload.requests,
      };
    default:
      return state;
  }
};

export default requestReducer;
