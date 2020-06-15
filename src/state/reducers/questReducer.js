import initialState from "../store/initialState";

const questReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_QUESTS":
      return {
        ...state,
        quests: action.payload.quests,
      };
    default:
      return state;
  }
};

export default questReducer;
