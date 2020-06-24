import initialState from "../store/initialState";

const offerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_OFFER":
      return {
        ...state,
        helperOffer: action.payload.helperOffer,
        updateMessages: action.payload.updateMessages,
        completedMessage: action.payload.completedMessage,
        error: action.payload.error,
        statusMessage: action.payload.statusMessage,
      };

    default:
      return state;
  }
};

export default offerReducer;
