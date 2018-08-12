const preferences = (state = [], action) => {
  switch (action.type) {
    case 'SAVE_MINUTES':
      return [
        ...state,
        {
          minutes: action.minutes
        }
      ]
    case 'SAVE_MUTE':
      return [
        ...state,
        {
          isMuted: action.isMuted
        }
      ]
    default:
      return state
  }
}

export default preferences