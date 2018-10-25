const timer = (state = { secondsRemaining: 0, status: "stopped" }, action) => {
  switch (action.type) {
    case "SAVE_SECONDS_REMAINING":
      return {
        ...state,
        secondsRemaining: action.payload
      };
    case "SAVE_STATUS":
      return {
        ...state,
        status: action.payload
      };
    default:
      return state;
  }
};

export default timer;
