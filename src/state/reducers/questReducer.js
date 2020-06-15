import initialState from "../store/initialState";

const questsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_QUESTS":
      return {
        ...state,
        quests: action.payload.quests,
      };
    default:
      return state;
  }
};

export default questsReducer;
