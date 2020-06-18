import initialState from "../store/initialState";

const activePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACTIVE_PAGE":
      return {
        ...state,
        activePage: action.payload
      };
    case "RESET_ACTIVE_PAGE":
      return {
        ...state,
        activePage: "home"
      }
    default:
      return state;
  }
};

export default activePageReducer;
