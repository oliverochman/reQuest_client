import initialState from "../store/initialState";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_AUTHENTICATED":
      return {
        ...state,
        authenticated: action.payload.authenticated,
        uid: action.payload.uid
      };
    
    default:
      return state;
  }
};

export default rootReducer;
