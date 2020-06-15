import axios from "axios";
const getQuests = async (dispatch) => {
  try {
    const response = axios.get("/api/quests");
    dispatch({
      type: "GET_QUESTS",
      payload: {
        quests: response.data.quests,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default getQuests;
