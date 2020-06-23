const getPlace = (dispatch) => {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      dispatch({
        type: "SET_LOCATION",
        payload: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }
      }
      )
    }
  )}