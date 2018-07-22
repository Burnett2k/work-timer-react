const preferences = (state = [], action) => {
  switch (action.type) {
    case 'SAVE_MINUTES':
      return [
        ...state,
        {
          id: action.id,
          numMinutes: action.numMinutes
        }
      ]
    case 'SAVE_MUTE':
      return [
        ...state,
        {
          id: action.id,
          isMuted: action.isMuted
        }
      ]
    default:
      return state
  }
}

export default preferences