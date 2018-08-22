const timer = (state = [], action) => {
  switch (action.type) {
    case 'SAVE_TIME_REMAINING':
      return [
        ...state,
        {
          secondsRemaining: action.secondsRemaining
        }
      ]
    case 'SAVE_STATUS':
      return [
        ...state,
        {
          status: action.status
        }
      ]
    default:
      return state
  }
}

export default timer