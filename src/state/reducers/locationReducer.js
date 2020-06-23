import initialState from "../store/initialState";

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOCATION":
      debugger;
      return {
        ...state,
        longitude: action.payload.longitude,
        latitude: action.payload.latitude,
      };

    default:
      return state;
  }
};

export default locationReducer;
